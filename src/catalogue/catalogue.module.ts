import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Plan } from './entities/plan.entity';
import { ProductService } from './services/product.service';
import { PlanService } from './services/plan.service';
import { ProductController } from './controllers/product.controller';
import { PlanController } from './controllers/plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Plan])],
  controllers: [ProductController, PlanController],
  providers: [ProductService, PlanService],
  exports: [ProductService, PlanService],
})
export class CatalogueModule {}
