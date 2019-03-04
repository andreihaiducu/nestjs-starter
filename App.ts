import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import 'reflect-metadata'
import { ApplicationModule } from './app.module';
import config from './src/config/config'
const PORT = config.serverPort
const prefix = '/api'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {

  const app = await NestFactory.create(ApplicationModule);
  app.enableCors()
  app.setGlobalPrefix(prefix)
  const options = new DocumentBuilder()
    .setTitle('Nest starter endpoints')
    .setDescription('Available interactions with the backend services')
    .setBasePath(prefix)
    .setVersion('1.0')
    .addTag('doraly marketplace')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${prefix}/swagger`, app, document);
  Logger.log('App started on port ' + PORT)
  await app.listen(PORT);
}
bootstrap()