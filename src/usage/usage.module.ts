import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [UsageController],
  providers: [UsageService],
  exports: [UsageService],
})
export class UsageModule {}
