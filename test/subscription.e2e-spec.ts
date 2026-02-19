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

describe('SubscriptionModule (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let accountId: string;
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

    // Setup test data
    const product = await request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Test Product', description: 'Test Description' });
    productId = product.body.id;

    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({ productId, name: 'Test Plan' });
    planId = plan.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@example.com',
          name: 'Test User',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.email).toBe('test@example.com');
          expect(response.body.name).toBe('Test User');
          userId = response.body.id;
        });
    });

    it('should return 400 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'invalid-email',
          name: 'Test User',
        })
        .expect(400);
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/accounts (POST)', () => {
    it('should create a new account', () => {
      return request(app.getHttpServer())
        .post('/accounts')
        .send({
          name: 'Test Account',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toBe('Test Account');
          accountId = response.body.id;
        });
    });
  });

  describe('/account-users (POST)', () => {
    it('should create a new account-user relationship', () => {
      return request(app.getHttpServer())
        .post('/account-users')
        .send({
          accountId,
          userId,
          role: 'admin',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.accountId).toBe(accountId);
          expect(response.body.userId).toBe(userId);
          expect(response.body.role).toBe('admin');
        });
    });
  });

  describe('/subscriptions (POST)', () => {
    it('should create a new subscription', () => {
      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

      return request(app.getHttpServer())
        .post('/subscriptions')
        .send({
          accountId,
          planId,
          startDate,
          endDate,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.accountId).toBe(accountId);
          expect(response.body.planId).toBe(planId);
        });
    });
  });

  describe('/subscriptions/account/:accountId (GET)', () => {
    it('should return subscriptions for a specific account', () => {
      return request(app.getHttpServer())
        .get(`/subscriptions/account/${accountId}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body[0].accountId).toBe(accountId);
        });
    });
  });
});
