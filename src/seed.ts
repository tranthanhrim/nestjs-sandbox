import { INestApplication } from '@nestjs/common';
import { ProductService } from './catalogue/services/product.service';
import { PlanService } from './catalogue/services/plan.service';
import { UserService } from './subscription/services/user.service';
import { AccountService } from './subscription/services/account.service';
import { AccountUserService } from './subscription/services/account-user.service';
import { SubscriptionService } from './subscription/services/subscription.service';

export async function seedDatabase(app: INestApplication) {
  const productService = app.get(ProductService);
  const planService = app.get(PlanService);
  const userService = app.get(UserService);
  const accountService = app.get(AccountService);
  const accountUserService = app.get(AccountUserService);
  const subscriptionService = app.get(SubscriptionService);

  console.log('🌱 Seeding database...');

  try {
    // Create Products
    const product1 = await productService.create({
      name: 'Cloud Storage',
      description: 'Secure cloud storage solution',
    });

    const product2 = await productService.create({
      name: 'Email Service',
      description: 'Professional email hosting service',
    });

    const product3 = await productService.create({
      name: 'Analytics Platform',
      description: 'Advanced data analytics and reporting',
    });

    console.log('✓ Created 3 products');

    // Create Plans
    const plan1 = await planService.create({
      productId: product1.id,
      name: 'Basic Storage - 10GB',
    });

    const plan2 = await planService.create({
      productId: product1.id,
      name: 'Pro Storage - 100GB',
    });

    const plan3 = await planService.create({
      productId: product2.id,
      name: 'Email Basic - 10 accounts',
    });

    const plan4 = await planService.create({
      productId: product2.id,
      name: 'Email Premium - Unlimited accounts',
    });

    const plan5 = await planService.create({
      productId: product3.id,
      name: 'Analytics Starter',
    });

    console.log('✓ Created 5 plans');

    // Create Users
    const user1 = await userService.create({
      email: 'john.doe@example.com',
      name: 'John Doe',
    });

    const user2 = await userService.create({
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    });

    const user3 = await userService.create({
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
    });

    const user4 = await userService.create({
      email: 'alice.johnson@example.com',
      name: 'Alice Johnson',
    });

    console.log('✓ Created 4 users');

    // Create Accounts
    const account1 = await accountService.create({
      name: 'Acme Corporation',
    });

    const account2 = await accountService.create({
      name: 'Tech Startup Inc',
    });

    const account3 = await accountService.create({
      name: 'Enterprise Solutions Ltd',
    });

    console.log('✓ Created 3 accounts');

    // Create Account Users
    await accountUserService.create({
      accountId: account1.id,
      userId: user1.id,
      role: 'admin',
    });

    await accountUserService.create({
      accountId: account1.id,
      userId: user2.id,
      role: 'member',
    });

    await accountUserService.create({
      accountId: account2.id,
      userId: user2.id,
      role: 'admin',
    });

    await accountUserService.create({
      accountId: account2.id,
      userId: user3.id,
      role: 'member',
    });

    await accountUserService.create({
      accountId: account3.id,
      userId: user4.id,
      role: 'admin',
    });

    console.log('✓ Created 5 account-user relationships');

    // Create Subscriptions
    const now = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    await subscriptionService.create({
      accountId: account1.id,
      planId: plan1.id,
      startDate: now.toISOString(),
      endDate: futureDate.toISOString(),
    });

    await subscriptionService.create({
      accountId: account1.id,
      planId: plan3.id,
      startDate: now.toISOString(),
      endDate: futureDate.toISOString(),
    });

    await subscriptionService.create({
      accountId: account2.id,
      planId: plan2.id,
      startDate: now.toISOString(),
      endDate: futureDate.toISOString(),
    });

    await subscriptionService.create({
      accountId: account2.id,
      planId: plan4.id,
      startDate: now.toISOString(),
      endDate: futureDate.toISOString(),
    });

    await subscriptionService.create({
      accountId: account3.id,
      planId: plan5.id,
      startDate: now.toISOString(),
      endDate: futureDate.toISOString(),
    });

    console.log('✓ Created 5 subscriptions');
    console.log('✅ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
