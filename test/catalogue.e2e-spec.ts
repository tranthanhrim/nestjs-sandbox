import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueModule } from '../src/catalogue/catalogue.module';
import { SubscriptionModule } from '../src/subscription/subscription.module';
import { Product } from '../src/catalogue/entities/product.entity';
import { Plan } from '../src/catalogue/entities/plan.entity';
import { User } from '../src/subscription/entities/user.entity';
import { Account } from '../src/subscription/entities/account.entity';
import { AccountUser } from '../src/subscription/entities/account-user.entity';
import { Subscription } from '../src/subscription/entities/subscription.entity';

describe('CatalogueModule (e2e)', () => {
  let app: INestApplication;
  let productId: string;
  let planId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Product, Plan, User, Account, AccountUser, Subscription],
          synchronize: true,
          logging: false,
        }),
        CatalogueModule,
        SubscriptionModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/products (POST)', () => {
    it('should create a new product', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Test Product',
          description: 'Test Description',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe('Test Product');
          expect(response.body.description).toBe('Test Description');
          productId = response.body.id;
        });
    });

    it('should return 400 for invalid data', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Test Product',
          // missing description
        })
        .expect(400);
    });
  });

  describe('/products (GET)', () => {
    it('should return all products', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/products/:id (GET)', () => {
    it('should return a specific product', () => {
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(productId);
          expect(response.body.name).toBe('Test Product');
        });
    });
  });

  describe('/plans (POST)', () => {
    it('should create a new plan', () => {
      return request(app.getHttpServer())
        .post('/plans')
        .send({
          productId: productId,
          name: 'Test Plan',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe('Test Plan');
          expect(response.body.productId).toBe(productId);
          planId = response.body.id;
        });
    });
  });

  describe('/plans (GET)', () => {
    it('should return all plans', () => {
      return request(app.getHttpServer())
        .get('/plans')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/plans/product/:productId (GET)', () => {
    it('should return plans for a specific product', () => {
      return request(app.getHttpServer())
        .get(`/plans/product/${productId}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body[0].productId).toBe(productId);
        });
    });
  });
});
