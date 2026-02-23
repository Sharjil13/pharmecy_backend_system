import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UUIDEntry } from './UUID.entry';
import { TenantModel } from './Tent.Model';

@Entity('users')
export class UserModel extends UUIDEntry {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ type: 'varchar', nullable: true })
  verify_token?: string;

  @Column({ type: 'timestamptz', nullable: true })
  verify_token_expiration?: Date;

  @Column({ type: 'varchar', nullable: true })
  reset_token?: string;

  @Column({ type: 'timestamptz', nullable: true })
  reset_token_expiration?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at?: Date;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @ManyToOne(() => TenantModel, (tenant) => tenant.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: TenantModel;
}
