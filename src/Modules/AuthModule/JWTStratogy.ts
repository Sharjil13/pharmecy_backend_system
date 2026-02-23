// src/auth/jwt.strategy.ts
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/Models/User.Model';
import { cookieExtractor } from './cookie-extractor';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '84836487s6ct$^gty_[67678',
    });
  }

  async validate(payload: UserModel) {
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      select: [
        'id',
        'username',
        'email',
        'isAdmin',
        'isActive',
        'isVerified',
        'role',
        'tenantId',
      ],
    });

    return {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
      isAdmin: user?.isAdmin,
      isActive: user?.isActive,
      isVerified: user?.isVerified,
      tenantId: user?.tenantId,
    };
  }
}
