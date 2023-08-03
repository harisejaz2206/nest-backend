import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserDocument>,
  ) {}

  async create(userData: User): Promise<User> {
    console.log('Creating user with data:', userData);
    const newUser = new this.userModel(userData);
    const result = await newUser.save();
    console.log('Result of save operation:', result);
    return result;
  }
}
