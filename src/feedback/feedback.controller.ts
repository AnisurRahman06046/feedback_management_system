import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

import { ResponseHandler } from './../utils/responseHandler';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('submit')
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

  // retrieve all feedbacks
  @Get('all-feedbacks')
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

  @Get('analysis')
  async feedbackAnalysis() {
    try {
      const result = await this.feedbackService.feedbackAnalysis();
      return ResponseHandler.success(result, 'Successfull', HttpStatus.OK);
    } catch (error) {
      return ResponseHandler.error(error.message);
    }
  }
}
