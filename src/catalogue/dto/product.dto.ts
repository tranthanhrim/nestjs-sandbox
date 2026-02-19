import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
