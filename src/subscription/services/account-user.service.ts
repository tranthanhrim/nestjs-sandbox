import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountUser } from '../entities/account-user.entity';
import {
  CreateAccountUserDto,
  UpdateAccountUserDto,
} from '../dto/account-user.dto';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectRepository(AccountUser)
    private accountUserRepository: Repository<AccountUser>,
  ) {}

  async create(
    createAccountUserDto: CreateAccountUserDto,
  ): Promise<AccountUser> {
    const accountUser = this.accountUserRepository.create(createAccountUserDto);
    return await this.accountUserRepository.save(accountUser);
  }

  async findAll(): Promise<AccountUser[]> {
    return await this.accountUserRepository.find({
      relations: ['account', 'user'],
    });
  }

  async findOne(id: string): Promise<AccountUser | null> {
    return await this.accountUserRepository.findOne({
      where: { id },
      relations: ['account', 'user'],
    });
  }

  async findByAccountId(accountId: string): Promise<AccountUser[]> {
    return await this.accountUserRepository.find({
      where: { accountId },
      relations: ['account', 'user'],
    });
  }

  async findByUserId(userId: string): Promise<AccountUser[]> {
    return await this.accountUserRepository.find({
      where: { userId },
      relations: ['account', 'user'],
    });
  }

  async update(
    id: string,
    updateAccountUserDto: UpdateAccountUserDto,
  ): Promise<AccountUser | null> {
    await this.accountUserRepository.update(id, updateAccountUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.accountUserRepository.delete(id);
  }
}
