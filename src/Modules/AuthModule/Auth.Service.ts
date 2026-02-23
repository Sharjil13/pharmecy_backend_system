import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  issueToken(user: any) {
    return this.jwtService.sign(user);
  }
  generaterefreshToken() {
    return randomUUID();
  }
  hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
