import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/Modules/UserModule/DTO/User/CreateUserDTO';
import { ApiResponce } from 'src/utils/ApiResponce';
import { UserServices } from 'src/Modules/UserModule/userServices';
import { VerifyUserDTO } from 'src/Modules/UserModule/DTO/User/VerifyUserDTO';
import { AuthService } from '../AuthModule/Auth.Service';
import e, { Response } from 'express';
@Controller('/users')
export class UserController {
  constructor(
    private readonly UserServices: UserServices,
    private readonly authService: AuthService,
  ) {}
  @Post('/create')
  async createUser(@Body() user: CreateUserDto): Promise<ApiResponce> {
    try {
      const createdUser = await this.UserServices.createUser(user);
      return new ApiResponce(
        200,
        true,
        'User created successfully',
        createdUser,
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ApiResponce(400, false, error.message, {});
      }
      return new ApiResponce(400, false, 'Something went wrong', {});
    }
  }
  @Post('/verify')
  async verifyUser(
    @Body() user: VerifyUserDTO,
    @Res({ passthrough: true }) res: e.Response,
  ) {
    try {
      const verifiedUser = await this.UserServices.verifyUser(user);

      const token = this.authService.issueToken({
        id: verifiedUser.id,
        email: verifiedUser.email,
        isAdmin: verifiedUser.isAdmin,
        isActive: verifiedUser.isActive,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return res.status(200).json(
        new ApiResponce(200, true, 'User verified successfully', {
          verifiedUser,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ApiResponce(400, false, error.message, {});
      }
      return new ApiResponce(400, false, 'Something went wrong', {});
    }
  }
}
