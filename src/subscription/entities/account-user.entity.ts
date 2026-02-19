import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { User } from './user.entity';

@Entity('account_users')
export class AccountUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column()
  userId: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.accountUsers)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @ManyToOne(() => User, (user) => user.accountUsers)
  @JoinColumn({ name: 'userId' })
  user: User;
}
