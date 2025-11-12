import { Column } from 'typeorm';
import { baseEntry } from './BaseEntry.Model';

export class UserModel extends baseEntry {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @Column({ nullable: false, default: false })
  isActive: boolean;

  @Column({ nullable: true })
  verify_token: string;

  @Column({ nullable: true })
  verify_token_expiration: Date;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: false, default: false })
  isBanned: boolean;

  @Column({ nullable: false, default: false })
  isLocked: boolean;

  @Column({ nullable: true })
  reset_token: string;

  @Column({ nullable: true })
  reset_token_expiration: Date;

  @Column({ nullable: true })
  verified_at: Date;

  constructor(
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
    isActive: boolean,
    verify_token: string,
    verify_token_expiration: Date,
    isVerified: boolean,
    isDeleted: boolean,
    isBanned: boolean,
    isLocked: boolean,
    reset_token: string,
    reset_token_expiration: Date,
    verified_at: Date,
  ) {
    super();
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isActive = isActive;
    this.verify_token = verify_token;
    this.verify_token_expiration = verify_token_expiration;
    this.isVerified = isVerified;
    this.isDeleted = isDeleted;
    this.isBanned = isBanned;
    this.isLocked = isLocked;
    this.reset_token = reset_token;
    this.reset_token_expiration = reset_token_expiration;
    this.verified_at = verified_at;
  }
}
