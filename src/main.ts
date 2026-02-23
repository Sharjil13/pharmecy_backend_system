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
import cookieParser from 'cookie-parser';
import { RolesGuard } from './Common/Guards/roles.guards';
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
        forbidUnknownValues: true,
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

    // Use JSON parser for regular JSON requests
    app.use(bodyParser.json({ limit: '5mb' }));
    // Use Cookie parcer to make cookies work
    app.use(cookieParser());

    // Global Guard for Authentication and Authorization
    app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

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
