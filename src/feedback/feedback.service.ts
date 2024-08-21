import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './entities/feedback.entity';
import { Model } from 'mongoose';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedBackModel: Model<Feedback>,
  ) {}
}
