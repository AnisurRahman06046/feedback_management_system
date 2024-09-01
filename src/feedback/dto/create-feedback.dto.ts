import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Excellent! The service is very fast',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Test User',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
