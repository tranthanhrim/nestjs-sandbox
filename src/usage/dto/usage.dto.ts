import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class GetUsageDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class GetProductAccountsDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
