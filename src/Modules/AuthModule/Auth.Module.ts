import { Module } from '@nestjs/common';
import { JWTSetupModule } from './JWTSetup.Module';
import { JwtStrategy } from './JWTStratogy';
import { AuthService } from './Auth.Service';

@Module({
  imports: [JWTSetupModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
