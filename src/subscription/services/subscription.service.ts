import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      startDate: new Date(createSubscriptionDto.startDate),
      endDate: new Date(createSubscriptionDto.endDate),
    });
    return await this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      relations: ['account', 'plan', 'plan.product'],
    });
  }

  async findOne(id: string): Promise<Subscription | null> {
    return await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['account', 'plan', 'plan.product'],
    });
  }

  async findByAccountId(accountId: string): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      where: { accountId },
      relations: ['account', 'plan', 'plan.product'],
    });
  }

  async findByPlanId(planId: string): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      where: { planId },
      relations: ['account', 'plan', 'plan.product'],
    });
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription | null> {
    const updateData: any = { ...updateSubscriptionDto };
    if (updateSubscriptionDto.startDate) {
      updateData.startDate = new Date(updateSubscriptionDto.startDate);
    }
    if (updateSubscriptionDto.endDate) {
      updateData.endDate = new Date(updateSubscriptionDto.endDate);
    }
    await this.subscriptionRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
