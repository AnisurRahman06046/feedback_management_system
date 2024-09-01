import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Excellent! The service is very fast',
    description: 'The feedback comment provided by the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    example: 5,
    description: 'Rating given by the user, ranging from 1 to 5',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Test User',
    description: 'Name of the user providing the feedback',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
