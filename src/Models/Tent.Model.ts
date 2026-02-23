import { Column, Entity, OneToMany } from 'typeorm';
import { UUIDEntry } from './UUID.entry';
import { UserModel } from './User.Model';

@Entity('tenants')
export class TenantModel extends UUIDEntry {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  licenseNumber: string;

  // Subscription type: MONTHLY, YEARLY, etc.
  @Column({ type: 'varchar', default: 'MONTHLY' })
  subscriptionPlan: string;

  // When subscription starts
  @Column({ type: 'timestamptz', nullable: true })
  subscriptionStart?: Date;

  // When subscription ends
  @Column({ type: 'timestamptz', nullable: true })
  subscriptionEnd?: Date;

  // Is tenant active? (based on subscription)
  @Column({ default: true })
  status: boolean;

  // Users linked to this tenant
  @OneToMany(() => UserModel, (user) => user.tenant)
  users?: UserModel[];
}
