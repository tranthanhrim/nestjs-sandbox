import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountUserService } from '../services/account-user.service';
import {
  CreateAccountUserDto,
  UpdateAccountUserDto,
} from '../dto/account-user.dto';

@Controller('account-users')
export class AccountUserController {
  constructor(private readonly accountUserService: AccountUserService) {}

  @Post()
  create(@Body() createAccountUserDto: CreateAccountUserDto) {
    return this.accountUserService.create(createAccountUserDto);
  }

  @Get()
  findAll() {
    return this.accountUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountUserService.findOne(id);
  }

  @Get('account/:accountId')
  findByAccountId(@Param('accountId') accountId: string) {
    return this.accountUserService.findByAccountId(accountId);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.accountUserService.findByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountUserDto: UpdateAccountUserDto,
  ) {
    return this.accountUserService.update(id, updateAccountUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountUserService.remove(id);
  }
}
