import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AccountUser } from './account-user.entity';
import { Subscription } from './subscription.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AccountUser, (accountUser) => accountUser.account)
  accountUsers: AccountUser[];

  @OneToMany(() => Subscription, (subscription) => subscription.account)
  subscriptions: Subscription[];
}
