import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8080',
      'http://localhost:4200',
      'https://lovely.castrom13.dev',
      'http://lovely.castrom13.dev'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  });
  
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Server started on port ${port}`);
}
bootstrap();
