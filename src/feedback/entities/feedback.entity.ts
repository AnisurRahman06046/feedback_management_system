import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ type: String, required: true })
  rating: string;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
