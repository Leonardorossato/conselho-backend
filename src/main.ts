import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `http://localhost:${process.env.APP_PORT}`,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  await app.listen(process.env.APP_PORT);
}
bootstrap();
