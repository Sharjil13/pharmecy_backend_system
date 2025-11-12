import { BadRequestException } from '@nestjs/common';
import { UserModel } from 'src/Models/User.Model';
import { Repository } from 'typeorm';

export class UserServices {
  constructor(private readonly userRepository: Repository<UserModel>) {}
  async createUser(data: any) {
    const existedUser = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }
    if (!data.password) {
      throw new BadRequestException('Password is required');
    }
    
  }
}
