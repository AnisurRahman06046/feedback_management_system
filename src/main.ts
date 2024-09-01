import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Customer Feedback Sentiment Analysis RestAPI')
    .setDescription(
      'This API handles user feedback submissions and performs sentiment analysis on the feedback received.',
    )
    .setVersion(version)
    .addTag(
      'Auth API',
      'Operations related to user authentication and registration',
    )
    .addTag(
      'Feedback API',
      'Operations related to user feedback and sentiment analysis',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
