/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({
    type: String,
    required: [true, 'please provide a username'],
    maxlength: [9, 'should not be more than 9 character long'],
    minlength: [4, ' username should not be less than 4 '],
    trim: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
  })
  email: string;

  @Prop({
    type: Number,
    unique: true,
    require: [true, 'Please provide a number'],
    maxlength: [11, 'number should not be more than 11 digits'],
    minlength: [10, 'number should not be more less than 11'],
    trim: true,
  })
  phonenumber: number;

  @Prop({
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  })
  password: string;

  
  @Prop({
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    default: 'USER',
  })
  role:{
    type: UserRole,
    default: UserRole.USER,
  } 
}

export const UserSchema = SchemaFactory.createForClass(User);
