import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './User.Controller';
import { UserServices } from './user.Services';
import { UserModel } from '../../Models/User.Model';
import { AuthModule } from '../AuthModule/Auth.Module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), AuthModule],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}
