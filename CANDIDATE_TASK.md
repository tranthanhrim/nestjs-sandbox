# Interview Task: Usage Module Implementation

## 🎯 Your Task

This project is a subscription management system. You are required to **design and implement the Usage feature** for this system.

The usage data is essential for billing and analytics. The usage data is polled from an external system (via a mocked function).

### What We've Provided

- ✅ Basic module structure (`usage.module.ts`, `usage.service.ts`, `usage.controller.ts`)
- ✅ Usage Entity with basic fields (`usage.entity.ts`)
- ✅ Mock implementation to fetch usage data from an external system (`external-usage.service.ts`)

### What You Need To Do

Design and implement a solution to store usage data that is fetched from the external system.

Requirements:
- Usage data should be stored in the database for billing purposes
- Each usage record should track:
  - Which product and plan were used
  - Which account used it
  - The usage amount
  - The time period (start date and end date)
  - When the record was created

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
