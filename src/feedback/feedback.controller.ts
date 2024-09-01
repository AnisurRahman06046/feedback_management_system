import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

import { ResponseHandler } from './../utils/responseHandler';

import { UserRoles } from '../../src/users/user.constants';
import { Public } from '../../src/auth/public.route';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../src/auth/roles.decorator';

@ApiTags('Feedback API')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Public()
  @Post('submit')
  @ApiOperation({ summary: 'Submit feedback' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Feedback submitted successfully',
  })
  async createFeedback(@Body() payload: CreateFeedbackDto) {
    try {
      const result = await this.feedbackService.createFeedBack(payload);
      return ResponseHandler.success(
        result,
        'Submitted successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return ResponseHandler.error(error.message);
    }
  }

  // @Public()
  // retrieve all feedbacks
  @Roles(UserRoles.ADMIN)
  @Get('all-feedbacks')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all feedbacks' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Feedbacks fetched successfully',
  })
  async allFeedbacks(@Query() query: any) {
    try {
      const result = await this.feedbackService.allFeedbacks(query);
      return ResponseHandler.success(
        result,
        'Fetched successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return ResponseHandler.error(error.message);
    }
  }

  @Roles(UserRoles.ADMIN)
  @Get('analysis')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Analyze feedbacks for sentiment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Feedback analysis successful',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async feedbackAnalysis() {
    try {
      const result = await this.feedbackService.feedbackAnalysis();
      return ResponseHandler.success(result, 'Successfull', HttpStatus.OK);
    } catch (error) {
      return ResponseHandler.error(error.message);
    }
  }
}
