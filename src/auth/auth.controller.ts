import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Public } from './public.route';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   register
  @Public()
  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User is registered successfully',
    schema: {
      example: {
        message: 'User is registered successfully',
        success: 'true',
        statusCode: 201,
        data: {
          _id: '66d4790357a0f5b9550bb53b',
          userName: 'Admin',
          email: 'admin@gmail.com',
          role: 'admin',
          __v: 0,
        },
      },
    },
  })
  async register(@Body() payload: CreateUserDto) {
    const result = await this.authService.registerUser(payload);
    return {
      message: 'User is registered successfully',
      success: 'true',
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }
  //   login
  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is logged in successfully',
    schema: {
      example: {
        message: 'User is logged in successfully',
        success: 'true',
        statusCode: 200,
        data: {
          access_token: 'EO0tbKzhvMmYgkQtP56R9qEAG3_v-cHYdiGGm4HFMiE',
        },
      },
    },
  })
  async login(@Body() payload: LoginDto) {
    const result = await this.authService.login(payload);
    return {
      message: 'User is logged in successfully',
      success: 'true',
      statusCode: HttpStatus.OK,
      data: result,
    };
  }
}
