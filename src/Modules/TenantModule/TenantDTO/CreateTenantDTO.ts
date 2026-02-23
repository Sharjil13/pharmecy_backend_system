// src/dto/userDto.ts
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class createTenantDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @IsNotEmpty()
  @IsString()
  subscriptionPlan: string;

  @IsOptional()
  @IsObject()
  user: {
    id: number;
    email: string;
    username: string;
    isAdmin: boolean;
    isActive: boolean;
    tenantId: number;
    isVerified: boolean;
  };
}
