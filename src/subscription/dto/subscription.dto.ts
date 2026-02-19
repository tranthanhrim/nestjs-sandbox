import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class UpdateSubscriptionDto {
  @IsUUID()
  accountId?: string;

  @IsUUID()
  planId?: string;

  @IsDateString()
  startDate?: string;

  @IsDateString()
  endDate?: string;
}
