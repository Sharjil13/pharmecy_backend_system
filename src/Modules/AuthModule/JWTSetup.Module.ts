// jwt-setup.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '84836487s6ct$^gty_[67678',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [JwtModule],
})
export class JWTSetupModule {}
