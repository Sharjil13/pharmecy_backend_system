import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
        whitelist: true, // strips out any unknown fields
        forbidNonWhitelisted: true, // throws error if extra fields provided
        transform: true, // transforms plain JS object into DTO instance
      }),
    );
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
