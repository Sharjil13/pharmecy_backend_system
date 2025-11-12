import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { UserModel } from './Models/User.Model';

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
      entities: [UserModel],
      synchronize: true, // false in production
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
