import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
