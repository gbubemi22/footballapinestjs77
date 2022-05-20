/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({
    maxlength: [9, 'should not be more than 9 character long'],
    minlength: [4, ' username should not be less than 4 '],
    trim: true,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    
    unique: true,
    require: [true, 'Please provide a number'],
    maxlength: [11, 'number should not be more than 11 digits'],
    minlength: [10, 'number should not be more less than 11'],
    trim: true,
  })
  phonenumber: number;

  @Prop({
    
    required: [true, 'Please provide password'],
    minlength: 6,
  })
  password: string;

  
  @Prop({
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    default: 'USER',
  })
  roles:{
    type: Role[],
    default: Role.USER,
  } 
}

export const UserSchema = SchemaFactory.createForClass(User);
