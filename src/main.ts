/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constans';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  // Server port
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  console.log(`listening on port ${await app.getUrl()}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //data basura
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}
bootstrap();
