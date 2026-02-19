import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { AccountUser } from './entities/account-user.entity';
import { Subscription } from './entities/subscription.entity';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { AccountUserService } from './services/account-user.service';
import { SubscriptionService } from './services/subscription.service';
import { UserController } from './controllers/user.controller';
import { AccountController } from './controllers/account.controller';
import { AccountUserController } from './controllers/account-user.controller';
import { SubscriptionController } from './controllers/subscription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, AccountUser, Subscription])],
  controllers: [UserController, AccountController, AccountUserController, SubscriptionController],
  providers: [UserService, AccountService, AccountUserService, SubscriptionService],
  exports: [UserService, AccountService, AccountUserService, SubscriptionService],
})
export class SubscriptionModule {}
