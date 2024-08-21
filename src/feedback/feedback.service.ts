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
  async allFeedbacks(query: any) {
    const { page = 1, limit = 10, rating, search } = query;
    const filter: any = {};
    if (rating) {
      filter.rating = rating;
    }

    // Searching by comment text or customer name
    if (search) {
      filter.$or = [
        { comment: { $regex: search, $options: 'i' } }, // case-insensitive search
        { name: { $regex: search, $options: 'i' } }, // case-insensitive search
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;
    const result = await this.feedBackModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    // Count total documents for pagination metadata
    const total = await this.feedBackModel.countDocuments(filter);

    return {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      data: result,
    };
  }

  // Feedback analytics for dashboard
  async feedbackAnalysis() {
    const [averageRating, ratingDistribution, topFeedback, feedbackTrends] =
      await Promise.all([
        this.feedBackModel.aggregate([
          {
            $group: {
              _id: null,
              averageRating: { $avg: { $toDouble: '$rating' } },
            },
          },
        ]),
        this.feedBackModel.aggregate([
          {
            $group: {
              _id: '$rating',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ]),
        this.feedBackModel.find().sort({ rating: -1 }).limit(5).exec(),
        this.feedBackModel.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
              averageRating: { $avg: { $toDouble: '$rating' } },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ]),
      ]);

    return {
      averageRating: averageRating[0]?.averageRating || 0,
      ratingDistribution,
      topFeedback,
      feedbackTrends,
    };
  }
}
