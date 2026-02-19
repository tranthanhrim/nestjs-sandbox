import { Controller, Post, Body } from '@nestjs/common';
import { UsageService } from './usage.service';
import { GetUsageDto, GetProductAccountsDto } from './dto/usage.dto';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post('get-usage')
  getUsage(@Body() getUsageDto: GetUsageDto) {
    return this.usageService.getUsage(getUsageDto);
  }

  @Post('get-product-accounts')
  getProductAccounts(@Body() getProductAccountsDto: GetProductAccountsDto) {
    return this.usageService.getProductAccounts(getProductAccountsDto);
  }
}
