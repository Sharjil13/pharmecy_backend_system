import { Column, Entity, ManyToOne } from 'typeorm';
import { UUIDEntry } from './UUID.entry';
import { UserModel } from './User.Model';

@Entity('refresh_tokens')
export class RefreshTokenModel extends UUIDEntry {
  @Column()
  tokenHash: string;
  @Column({ type: 'timestamptz', nullable: false })
  expiresAt: Date;
  @Column({ type: 'boolean', default: false })
  isRevoked: boolean;

  @ManyToOne(() => UserModel, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  user: UserModel;
}
