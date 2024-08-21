import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, default: 'admin' })
  role: string;

  @Prop({ type: String, required: true })
  hashedPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
