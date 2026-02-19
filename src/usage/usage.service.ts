import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import { ProductService } from '../catalogue/services/product.service';
import { PlanService } from '../catalogue/services/plan.service';
import { AccountService } from '../subscription/services/account.service';
import { SubscriptionService } from '../subscription/services/subscription.service';
import { Usage } from './entities/usage.entity';
import { Account } from '../subscription/entities/account.entity';
import { ExternalUsageService } from './external-usage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsageService {
  constructor(
    @InjectRepository(Usage)
    private usageRepository: Repository<Usage>,
    private readonly productService: ProductService,
    private readonly planService: PlanService,
    private readonly accountService: AccountService,
    private readonly subscriptionService: SubscriptionService,
    private readonly externalUsageService: ExternalUsageService,
  ) {}

  async randomInsert() {
    const usage = this.usageRepository.create({
      usage: await this.externalUsageService.getUsageFromExternal({
        productId: uuidv4(),
        planId: uuidv4(),
        accountId: uuidv4(),
        startDate: new Date(),
        endDate: new Date(),
      }),
    });
    return this.usageRepository.save(usage);
  }

  async findAll(): Promise<Usage[]> {
    return await this.usageRepository.find();
  }
}
