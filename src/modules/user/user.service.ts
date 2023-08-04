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

  /**
   * Creates a new user in the database.
   *
   * @param {User} userData - The data for the new user.
   * @returns {Promise<User>} A promise that resolves with the created user.
   */
  async create(userData: User): Promise<User> {
    console.log('Creating user with data:', userData);
    const newUser = new this.userModel(userData);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await newUser.save();
    console.log('Result of save operation:', result);
    if (result) {
      result.password = undefined;
    }
    return result;
  }

  // ---------------------------------------------

  /**
   * Fetches all users from the database.
   *
   * @returns {Promise<User[]>} A promise that resolves with an array of all users.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // ---------------------------------------------

  async update(id: string, userData: User): Promise<User> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  // ---------------------------------------------

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
