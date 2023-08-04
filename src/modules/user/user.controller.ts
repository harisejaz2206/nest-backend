import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUser(@Body() userData: User): Promise<User> {
    console.log('Received user data:', userData);
    const createdUser = await this.userService.create(userData);
    console.log('Created user:', createdUser);
    return createdUser;
  }

  // ---------------------------------------------

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully fetched.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // ---------------------------------------------

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. ',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userData: User,
  ): Promise<User> {
    return this.userService.update(id, userData);
  }

  // ---------------------------------------------

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
