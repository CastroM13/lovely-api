import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        const connection = uri;
        return {
          connectionFactory: connection => {
            if (connection.readyState === 1) {
               Logger.log('Connected successfully', 'MongoDB');
            }
            connection.on('disconnected', () => {
               Logger.error('Disconnected', 'MongoDB');
            });
            connection.on('error', error => {
               Logger.error('Connection failed! for error: ', error, 'MongoDB');
            });
            return connection;
          },
          uri: connection,
        };
      },
    }),
    AuthModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
