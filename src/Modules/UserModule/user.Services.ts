import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/Modules/UserModule/DTO/User/CreateUserDTO';
import { VerifyUserDTO } from 'src/Modules/UserModule/DTO/User/VerifyUserDTO';
import { UserModel } from 'src/Models/User.Model';
import { Common } from 'src/utils/Common';
import { Repository } from 'typeorm';
import { AuthService } from '../AuthModule/Auth.Service';
import { UserResponseDto } from './User.Resource';
import { LoginUserDto } from './DTO/User/LoginDTO';

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly authService: AuthService,
  ) {}
  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    const existedUser = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }
    if (!data.password) {
      throw new BadRequestException('Password is required');
    }
    // hashed Password
    const hashedPassword = await Common.hashPassword(data.password);
    data.password = hashedPassword;
    // Verification Code
    const verify_code = Common.generateVerificationCode();
    data.verify_token = verify_code;
    // 15 minutes
    data.verify_token_expiration = Common.generate_expirt_time();
    const user = this.userRepository.create(data);
    const SavedUser = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, SavedUser);
  }
  async verifyUser(
    user: VerifyUserDTO,
    // @Res() res: e.Response,
  ): Promise<UserResponseDto> {
    const existedUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (!existedUser) {
      throw new BadRequestException('User not found');
    }
    if (existedUser.verify_token !== user.code) {
      throw new BadRequestException('Invalid verification code');
    }
    if (
      !existedUser.verify_token_expiration ||
      existedUser.verify_token_expiration < new Date()
    ) {
      throw new BadRequestException('Verification code expired');
    }
    const UpdatedUser = await this.userRepository.save({
      ...existedUser,
      isVerified: true,
      verify_token: '',
      verified_at: new Date(),
    });

    return plainToInstance(UserResponseDto, UpdatedUser);
  }

  async login(user: LoginUserDto): Promise<UserResponseDto> {
    const { email, password } = user;
    const existedUser = await this.userRepository.findOneBy({
      email: email,
    });
    if (!existedUser) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await Common.comparePassword(
      password,
      existedUser.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return plainToInstance(UserResponseDto, existedUser);
  }
}
