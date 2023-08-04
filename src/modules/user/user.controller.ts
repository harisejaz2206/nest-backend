import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   *
   * @param {User} userData - The data for the new user.
   * @returns {Promise<User>} A promise that resolves with the created user.
   */
  @Post('/')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Create new user' })
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  /**
   * Fetches all users.
   *
   * @returns {Promise<User[]>} A promise that resolves with an array of all users.
   */

  @Get('/')
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Updates a user.
   *
   * @param {string} id - The ID of the user to update.
   * @param {User} userData - The new data for the user.
   * @returns {Promise<User>} A promise that resolves with the updated user.
   */
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: User,
  ): Promise<User> {
    return this.userService.update(id, userData);
  }

  /**
   * Deletes a user.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the user has been deleted.
   */
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  /**
   * Fetches a user by their ID.
   *
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<User>} A promise that resolves with the fetched user.
   */
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
