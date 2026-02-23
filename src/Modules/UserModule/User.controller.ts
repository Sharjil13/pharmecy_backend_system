import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/Modules/UserModule/DTO/User/CreateUserDTO';
import { ApiResponce } from 'src/utils/ApiResponce';
import { UserServices } from 'src/Modules/UserModule/user.Services';
import { VerifyUserDTO } from 'src/Modules/UserModule/DTO/User/VerifyUserDTO';
import { AuthService } from '../AuthModule/Auth.Service';
import e from 'express';
import { Public } from '../AuthModule/public.decorator';
import { LoginUserDto } from './DTO/User/LoginDTO';
@Controller('/users')
export class UserController {
  constructor(
    private readonly UserServices: UserServices,
    private readonly authService: AuthService,
  ) {}
  @Post('/create')
  @Public()
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
  @Public()
  async verifyUser(
    @Body() user: VerifyUserDTO,
    @Res({ passthrough: true }) res: e.Response,
  ): Promise<ApiResponce> {
    try {
      const verifiedUser = await this.UserServices.verifyUser(user);

      const token = this.authService.issueToken({
        id: verifiedUser.id,
        role: verifiedUser.role,
        email: verifiedUser.email,
        isAdmin: verifiedUser.isAdmin,
        isActive: verifiedUser.isActive,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      return new ApiResponce(
        200,
        true,
        'User verified successfully',
        verifiedUser,
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ApiResponce(400, false, error.message, {});
      }
      return new ApiResponce(400, false, 'Something went wrong', {});
    }
  }

  @Post('/login')
  @Public()
  async loginUser(
    @Body() user: LoginUserDto,
    @Res({ passthrough: true }) res: e.Response,
  ): Promise<ApiResponce> {
    try {
      const loggedUser = await this.UserServices.login(user);

      const token = this.authService.issueToken({
        id: loggedUser.id,
        role: loggedUser.role,
        email: loggedUser.email,
        isAdmin: loggedUser.isAdmin,
        isActive: loggedUser.isActive,
        tenantId: loggedUser.tenantId,
        isVerified: loggedUser.isVerified,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return new ApiResponce(
        200,
        true,
        'User verified successfully',
        loggedUser,
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ApiResponce(400, false, error.message, {});
      }
      return new ApiResponce(400, false, 'Something went wrong', {});
    }
  }
}
