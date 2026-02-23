import { Module } from '@nestjs/common';
import { JWTSetupModule } from './JWTSetup.Module';
import { JwtStrategy } from './JWTStratogy';
import { AuthService } from './Auth.Service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/Models/User.Model';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), JWTSetupModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
