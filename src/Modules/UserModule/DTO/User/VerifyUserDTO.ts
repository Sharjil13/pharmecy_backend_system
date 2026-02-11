import { IsEmail, IsString } from 'class-validator';

export class VerifyUserDTO {
  @IsString()
  code: string;

  @IsEmail()
  email: string;
}
