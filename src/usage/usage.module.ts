import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { Usage } from './entities/usage.entity';
import { ExternalUsageService } from './external-usage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usage]),
    CatalogueModule,
    SubscriptionModule,
  ],
  controllers: [UsageController],
  providers: [UsageService, ExternalUsageService],
  exports: [UsageService],
})
export class UsageModule {}
