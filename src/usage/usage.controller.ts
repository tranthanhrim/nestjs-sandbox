import { Controller, Get } from '@nestjs/common';
import { UsageService } from './usage.service';

@Controller('usages')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  findAll() {
    return this.usageService.findAll();
  }

  @Get('random-insert')
  async randomInsert() {
    return this.usageService.randomInsert();
  }
}
