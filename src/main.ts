import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GlobalExceptionFilter } from './Common/filter/global-exception.filter';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    // For hidding Some Fields from DB Globally
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    //For howing Validation Errors
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const messages = errors
            .map((err) => Object.values(err.constraints || {}))
            .flat();

          return new BadRequestException(messages);
        },
      }),
    );
    // Handle Global errors
    app.useGlobalFilters(new GlobalExceptionFilter());

    app.use(bodyParser.raw({ type: 'application/json' })); // required by Stripe

    console.log('📦 Database connected successfully');
    await app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('❌ Application startup failed:', error);
    process.exit(1);
  }
}

bootstrap();
