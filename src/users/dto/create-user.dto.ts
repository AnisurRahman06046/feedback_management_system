import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Admin', required: true })
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ example: 'admin@gmail.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'admin1234', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string = 'admin';
}
