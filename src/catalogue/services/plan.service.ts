import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';
import { CreatePlanDto, UpdatePlanDto } from '../dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find({ relations: ['product'] });
  }

  async findOne(id: string): Promise<Plan | null> {
    return await this.planRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async findByProductId(productId: string): Promise<Plan[]> {
    return await this.planRepository.find({
      where: { productId },
      relations: ['product'],
    });
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan | null> {
    await this.planRepository.update(id, updatePlanDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.planRepository.delete(id);
  }
}
