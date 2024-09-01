import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Changed from hashedPassword to password

  @Prop({ default: 'admin' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
