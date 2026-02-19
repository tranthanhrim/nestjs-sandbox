import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogueModule } from './catalogue/catalogue.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UsageModule } from './usage/usage.module';
import { Product } from './catalogue/entities/product.entity';
import { Plan } from './catalogue/entities/plan.entity';
import { User } from './subscription/entities/user.entity';
import { Account } from './subscription/entities/account.entity';
import { AccountUser } from './subscription/entities/account-user.entity';
import { Subscription } from './subscription/entities/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Product, Plan, User, Account, AccountUser, Subscription],
      synchronize: true, // database schema should be auto created on every application launch
      logging: false,
    }),
    CatalogueModule,
    SubscriptionModule,
    UsageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
