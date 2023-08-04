import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserDocument>,
  ) {}

  async create(userData: User): Promise<User> {
    console.log('Creating user with data:', userData);
    const newUser = new this.userModel(userData);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await newUser.save();
    console.log('Result of save operation:', result);
    return result;
  }
}
