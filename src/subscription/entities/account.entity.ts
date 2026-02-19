import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AccountUser } from './account-user.entity';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';

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

  @OneToMany(() => AccountUser, (accountUser) => accountUser.account, {
    eager: true,
  })
  accountUsers: AccountUser[];

  @OneToMany(() => Subscription, (subscription) => subscription.account, {
    eager: true,
  })
  subscriptions: Subscription[];

  @ManyToMany(() => User, (user) => user.accounts, {
    eager: true,
  })
  @JoinTable({
    name: 'account_users',
    joinColumn: { name: 'accountId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  users: User[];
}
