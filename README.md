# NestJS Sandbox - Interview Project

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)

## 🎯 Overview

This project implements a subscription management system with three main modules:

1. **Catalogue Module** - Manages products and plans
2. **Subscription Module** - Manages users, accounts, and subscriptions
3. **Usage Module** - Tracks usage data (YOUR TASK)

### Technologies Used

- **NestJS** - Latest version
- **TypeORM** - ORM for database operations
- **SQLite** - In-memory database
- **Class Validator** - Request validation
- **Jest** - Testing framework

## 🏗️ Architecture

The application follows NestJS best practices with a modular architecture:

```
src/
├── catalogue/           # Product and Plan management
├── subscription/        # User, Account, and Subscription management
├── usage/              # Usage tracking (mock implementation)
├── app.module.ts       # Root module
├── main.ts             # Application entry point
└── seed.ts             # Database seeding
```

## 🗄️ Database Schema

### ER Diagram

```
┌─────────────────┐
│    Products     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│     Plans       │
├─────────────────┤
│ id (PK)         │
│ productId (FK)  │
│ name            │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼──────────────┐      ┌─────────────────┐
│   Subscriptions       │      │    Accounts     │
├───────────────────────┤      ├─────────────────┤
│ id (PK)               │◄─────┤ id (PK)         │
│ accountId (FK)        │ N:1  │ name            │
│ planId (FK)           │      │ createdAt       │
│ startDate             │      │ updatedAt       │
│ endDate               │      └────────┬────────┘
│ createdAt             │               │
│ updatedAt             │               │ 1:N
└───────────────────────┘               │
                                ┌───────▼─────────┐
                                │  AccountUsers   │
                                ├─────────────────┤
                                │ id (PK)         │
                                │ accountId (FK)  │──┐
                                │ userId (FK)     │  │
                                │ role            │  │ N:1
                                │ createdAt       │  │
                                │ updatedAt       │  │
                                └─────────────────┘  │
                                                     │
                                ┌────────────────────▼
                                │     Users       │
                                ├─────────────────┤
                                │ id (PK)         │
                                │ email           │
                                │ name            │
                                │ createdAt       │
                                │ updatedAt       │
                                └─────────────────┘
```

## 🚀 Installation

```bash
# Install dependencies
npm install
```

## ▶️ Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run start:prod
```

The application will start on `http://localhost:3000`

### Seed Data

The database is automatically seeded with sample data on startup:
- 3 Products
- 5 Plans
- 4 Users
- 3 Accounts
- 5 Account-User relationships
- 5 Subscriptions

## 🧪 Testing

```bash
# Run all unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

### Test Coverage

The project includes:
- **Unit tests** for services
- **E2E tests** for all modules
- Test coverage for critical business logic

## 📡 API Endpoints

### Products

- `POST /products` - Create a product
- `GET /products` - Get all products
- `GET /products/:id` - Get a product by ID
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Plans

- `POST /plans` - Create a plan
- `GET /plans` - Get all plans
- `GET /plans/:id` - Get a plan by ID
- `GET /plans/product/:productId` - Get plans by product ID
- `PATCH /plans/:id` - Update a plan
- `DELETE /plans/:id` - Delete a plan

### Users

- `POST /users` - Create a user
- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Accounts

- `POST /accounts` - Create an account
- `GET /accounts` - Get all accounts
- `GET /accounts/:id` - Get an account by ID
- `PATCH /accounts/:id` - Update an account
- `DELETE /accounts/:id` - Delete an account

### Subscriptions

- `POST /subscriptions` - Create a subscription
- `GET /subscriptions` - Get all subscriptions
- `GET /subscriptions/:id` - Get a subscription by ID
- `GET /subscriptions/account/:accountId` - Get subscriptions by account ID
- `GET /subscriptions/plan/:planId` - Get subscriptions by plan ID
- `PATCH /subscriptions/:id` - Update a subscription
- `DELETE /subscriptions/:id` - Delete a subscription

## 🔍 Key Features

1. **In-Memory Database** - SQLite in-memory database for fast testing
2. **Automatic Seeding** - Database is seeded with sample data on startup
3. **TypeORM Integration** - Full TypeORM support with entities and repositories
4. **Validation** - Request validation using class-validator
5. **Relations** - Proper entity relationships and eager loading
6. **CRUD Operations** - Complete CRUD operations for all entities
7. **Mock Usage Service** - Deterministic usage data based on hash function
8. **Comprehensive Testing** - Unit and E2E tests for all modules
