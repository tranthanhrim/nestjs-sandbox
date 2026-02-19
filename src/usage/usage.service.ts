import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import { GetUsageDto, GetProductAccountsDto } from './dto/usage.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsageService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  /**
   * Generate a deterministic usage number based on input parameters
   */
  private generateUsageFromHash(
    productId: string,
    planId: string,
    accountId: string,
    startDate: string,
    endDate: string,
  ): number {
    const input = `${productId}${planId}${accountId}${startDate}${endDate}`;
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    // Convert first 8 characters of hash to a number between 0 and 10000
    const numericHash = parseInt(hash.substring(0, 8), 16);
    return numericHash % 10000;
  }

  /**
   * Mock endpoint to return usage data
   */
  async getUsage(getUsageDto: GetUsageDto) {
    const totalUsage = this.generateUsageFromHash(
      getUsageDto.productId,
      getUsageDto.planId,
      getUsageDto.accountId,
      getUsageDto.startDate,
      getUsageDto.endDate,
    );

    return {
      productId: getUsageDto.productId,
      accountId: getUsageDto.accountId,
      totalUsage,
      startDate: getUsageDto.startDate,
      endDate: getUsageDto.endDate,
    };
  }

  /**
   * Get all accounts subscribed to any plan under a specific product
   */
  async getProductAccounts(getProductAccountsDto: GetProductAccountsDto) {
    const subscriptions = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoin('subscription.plan', 'plan')
      .where('plan.productId = :productId', {
        productId: getProductAccountsDto.productId,
      })
      .select('DISTINCT subscription.accountId', 'accountId')
      .getRawMany();

    return subscriptions.map((sub) => sub.accountId);
  }
}
