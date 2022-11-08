import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { createUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
     
constructor (private usersService: UsersService){}

@Get()
async getNames (){ 
    return await this.usersService.getNames()
}

@Post('register')
@HttpCode(200)
async create(@Body() user: createUserDto){
    return this.usersService.addUser(user)
}

}
