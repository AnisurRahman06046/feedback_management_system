import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
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
}
