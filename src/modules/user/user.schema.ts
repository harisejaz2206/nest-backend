import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  maxLength,
} from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @Prop({ unique: true })
  @IsEmail()
  @MaxLength(30)
  email: string;

  @Prop()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
