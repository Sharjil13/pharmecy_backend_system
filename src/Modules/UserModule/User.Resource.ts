import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  tenantId: string | null;

  @Expose()
  isVerified: boolean;

  @Expose()
  createdAt: Date;
}
