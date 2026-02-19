import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findOne(id: string): Promise<Account | null> {
    return await this.accountRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account | null> {
    await this.accountRepository.update(id, updateAccountDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.accountRepository.delete(id);
  }
}
