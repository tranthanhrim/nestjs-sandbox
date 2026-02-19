import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAccountUserDto {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateAccountUserDto {
  @IsUUID()
  accountId?: string;

  @IsUUID()
  userId?: string;

  @IsString()
  role?: string;
}
