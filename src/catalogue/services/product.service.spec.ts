import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const mockProduct = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Product',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
    plans: [],
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockProduct),
    save: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
      };

      const result = await service.create(createProductDto);

      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(repository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({ relations: ['plans'] });
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await service.findOne(mockProduct.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockProduct.id },
        relations: ['plans'],
      });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto = { name: 'Updated Product' };
      mockRepository.findOne.mockResolvedValueOnce(mockProduct);

      const result = await service.update(mockProduct.id, updateProductDto);

      expect(repository.update).toHaveBeenCalledWith(mockProduct.id, updateProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await service.remove(mockProduct.id);

      expect(repository.delete).toHaveBeenCalledWith(mockProduct.id);
    });
  });
});
