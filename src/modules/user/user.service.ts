import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { ApiBody } from '@nestjs/swagger';

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
    const newUser = new this.userModel(userData);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await newUser.save();
    if (result) {
      result.password = undefined;
    }
    return result;
  }

  /**
   * Fetches all users from the database.
   *
   * @returns {Promise<User[]>} A promise that resolves with an array of all users.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Updates a user in the database.
   *
   * @param {string} id - The ID of the user to update.
   * @param {User} userData - The new data for the user.
   * @returns {Promise<User>} A promise that resolves with the updated user.
   */
  async update(id: string, userData: User): Promise<User> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  /**
   * Deletes a user from the database.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the user has been deleted.
   */
  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  /**
   * Fetches a user from the database by their username.
   *
   * @param {string} username - The username of the user to fetch.
   * @returns {Promise<User>} A promise that resolves with the fetched user.
   */
  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  /**
   * Fetches a user from the database by their ID.
   *
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<User>} A promise that resolves with the fetched user.
   */
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
