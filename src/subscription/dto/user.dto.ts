import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  name?: string;
}
