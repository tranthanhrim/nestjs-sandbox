import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePlanDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePlanDto {
  @IsUUID()
  productId?: string;

  @IsString()
  name?: string;
}
