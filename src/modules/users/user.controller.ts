import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles';

@ApiUseTags('Users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  saveUser(@Body() user: User) {
    return this.userService.saveUser(user)
  }

  @Roles('admin')
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id)
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() user: User) {
    return this.userService.updateUser(user, id)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id)
  }
}
