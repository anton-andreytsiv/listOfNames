import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto } from './dto/users.dto';
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async addUser(user: createUserDto): Promise<createUserDto | null> {
        user.password = await hash(user.password, 11)
        return await this.prisma.userModel.create({
            data: user
        })
    }
    async getNames (){
        return this.prisma.listOfNames.findMany();
    }
}
