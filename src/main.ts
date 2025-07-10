import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Server started on port ${port}`);
}
bootstrap();
