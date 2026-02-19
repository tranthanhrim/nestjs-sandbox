import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateAccountDto {
  @IsString()
  name?: string;
}
