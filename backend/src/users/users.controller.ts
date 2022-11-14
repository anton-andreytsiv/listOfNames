import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { createUserDto, loginUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
     
constructor (private usersService: UsersService){}

@Post('login')
@HttpCode(200)
async login(@Body() user: loginUserDto): Promise<loginUserDto | null>{
    return await this.usersService.loginUser(user)

}
@Post('register')
@HttpCode(200)
async create(@Body() user: createUserDto){
    return this.usersService.addUser(user)
}


}
