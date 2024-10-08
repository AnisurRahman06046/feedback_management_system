import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port || 3000;
  app.use(helmet());
  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:3000',
      'https://feedback-management-system.onrender.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    credentials: true,
  };
  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('Customer Feedback Sentiment Analysis RestAPI')
    .setDescription(
      'This API handles user feedback submissions and performs sentiment analysis on the feedback received.',
    )
    .setVersion(version)
    .addServer('https://feedback-management-system.onrender.com', 'Production')
    .addServer('http://localhost:3000', 'Local')
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

  await app.listen(port, () => {
    console.log(`Api Documentation: http://localhost:${port}/api-docs`);
    console.log(
      'Api Documentation: https://feedback-management-system.onrender.com/api-docs',
    );
  });
}
bootstrap();
