import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './entities/feedback.entity';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedBackModel: Model<Feedback>,
  ) {}

  // create feedback for public/customer
  async createFeedBack(payload: CreateFeedbackDto) {
    const result = await this.feedBackModel.create(payload);
    return result;
  }

  // retrieve all feedback for admin
  async allFeedbacks() {
    const result = await this.feedBackModel.find({});
    return result;
  }
}
