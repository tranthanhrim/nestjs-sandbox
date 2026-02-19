import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueModule } from '../src/catalogue/catalogue.module';
import { SubscriptionModule } from '../src/subscription/subscription.module';
import { UsageModule } from '../src/usage/usage.module';
import { Product } from '../src/catalogue/entities/product.entity';
import { Plan } from '../src/catalogue/entities/plan.entity';
import { User } from '../src/subscription/entities/user.entity';
import { Account } from '../src/subscription/entities/account.entity';
import { AccountUser } from '../src/subscription/entities/account-user.entity';
import { Subscription } from '../src/subscription/entities/subscription.entity';

describe('UsageModule (e2e)', () => {
  let app: INestApplication;
  let productId: string;
  let accountId: string;
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
        UsageModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    // Setup test data
    const product = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Test Product', description: 'Test Description' });
    productId = product.body.id;

    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({ productId, name: 'Test Plan' });
    planId = plan.body.id;

    const account = await request(app.getHttpServer())
      .post('/accounts')
      .send({ name: 'Test Account' });
    accountId = account.body.id;

    const startDate = new Date().toISOString();
    const endDate = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ).toISOString();

    await request(app.getHttpServer())
      .post('/subscriptions')
      .send({ accountId, planId, startDate, endDate });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/usage/get-usage (POST)', () => {
    it('should return usage data', () => {
      const startDate = '2024-01-01T00:00:00.000Z';
      const endDate = '2024-12-31T23:59:59.000Z';

      return request(app.getHttpServer())
        .post('/usage/get-usage')
        .send({
          productId,
          accountId,
          startDate,
          endDate,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('productId', productId);
          expect(response.body).toHaveProperty('accountId', accountId);
          expect(response.body).toHaveProperty('totalUsage');
          expect(typeof response.body.totalUsage).toBe('number');
          expect(response.body).toHaveProperty('startDate', startDate);
          expect(response.body).toHaveProperty('endDate', endDate);
        });
    });

    it('should return consistent usage for same inputs', async () => {
      const startDate = '2024-01-01T00:00:00.000Z';
      const endDate = '2024-12-31T23:59:59.000Z';

      const response1 = await request(app.getHttpServer())
        .post('/usage/get-usage')
        .send({ productId, accountId, startDate, endDate });

      const response2 = await request(app.getHttpServer())
        .post('/usage/get-usage')
        .send({ productId, accountId, startDate, endDate });

      expect(response1.body.totalUsage).toBe(response2.body.totalUsage);
    });
  });

  describe('/usage/get-product-accounts (POST)', () => {
    it('should return accounts subscribed to product', () => {
      return request(app.getHttpServer())
        .post('/usage/get-product-accounts')
        .send({
          productId,
        })
        .expect(201)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body).toContain(accountId);
        });
    });

    it('should return empty array for product with no subscriptions', async () => {
      const product2 = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Product Without Subscriptions',
          description: 'No subs',
        });

      return request(app.getHttpServer())
        .post('/usage/get-product-accounts')
        .send({
          productId: product2.body.id,
        })
        .expect(201)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBe(0);
        });
    });
  });
});
