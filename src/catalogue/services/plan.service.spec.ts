import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanService } from '../services/plan.service';
import { Plan } from '../entities/plan.entity';

describe('PlanService', () => {
  let service: PlanService;
  let repository: Repository<Plan>;

  const mockPlan = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    productId: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Plan',
    createdAt: new Date(),
    updatedAt: new Date(),
    product: null,
    subscriptions: [],
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockPlan),
    save: jest.fn().mockResolvedValue(mockPlan),
    find: jest.fn().mockResolvedValue([mockPlan]),
    findOne: jest.fn().mockResolvedValue(mockPlan),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanService,
        {
          provide: getRepositoryToken(Plan),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlanService>(PlanService);
    repository = module.get<Repository<Plan>>(getRepositoryToken(Plan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new plan', async () => {
      const createPlanDto = {
        productId: mockPlan.productId,
        name: 'Test Plan',
      };

      const result = await service.create(createPlanDto);

      expect(repository.create).toHaveBeenCalledWith(createPlanDto);
      expect(repository.save).toHaveBeenCalledWith(mockPlan);
      expect(result).toEqual(mockPlan);
    });
  });

  describe('findAll', () => {
    it('should return an array of plans', async () => {
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({ relations: ['product'] });
      expect(result).toEqual([mockPlan]);
    });
  });

  describe('findOne', () => {
    it('should return a single plan', async () => {
      const result = await service.findOne(mockPlan.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockPlan.id },
        relations: ['product'],
      });
      expect(result).toEqual(mockPlan);
    });
  });

  describe('findByProductId', () => {
    it('should return plans for a specific product', async () => {
      const result = await service.findByProductId(mockPlan.productId);

      expect(repository.find).toHaveBeenCalledWith({
        where: { productId: mockPlan.productId },
        relations: ['product'],
      });
      expect(result).toEqual([mockPlan]);
    });
  });
});
