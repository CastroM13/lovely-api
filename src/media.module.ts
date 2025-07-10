import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from './media.schema';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema, collection: 'trackerstore' }]),
  ],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {} 