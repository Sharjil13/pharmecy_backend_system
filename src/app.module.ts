import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { UserModule } from './Modules/UserModule/User.Module';
import { AuthModule } from './Modules/AuthModule/Auth.Module';
import { QueueModule } from './Modules/Queue/Queue.module';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.Model{.ts,.js}'],
      synchronize: true, // false in production
    }),
    AuthModule,
    UserModule,
    QueueModule,
  ],
})
export class AppModule {}
