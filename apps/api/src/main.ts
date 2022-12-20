/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { parseSeverConf } from './parse';
import { ParseServer } from 'parse-server';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.API_PREFIX;

  const api = new ParseServer(parseSeverConf);
  // Bind parse server to express.
  app.use(process.env.PARSE_MOUNT_PATH || '/', api);

  ParseServer.createLiveQueryServer(app.getHttpServer(), {
    port: 1337,
    redisURL: process.env.REDIS_URL,
  });


  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
