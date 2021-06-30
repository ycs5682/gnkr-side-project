import { Controller, Delete, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser(@Body() data: UserDto) {
    return this.service.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: UserDto) {
    return this.service.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.service.deleteUser(id);
  }

  @Post('/login')
  login(@Body() data: UserDto) {
    return this.service.login(data);
  }
}
