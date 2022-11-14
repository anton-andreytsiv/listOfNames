import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto, loginUserDto } from './dto/users.dto';
import { compare, hash } from 'bcryptjs'
import { ListService } from 'src/list/list.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private listService: ListService
        ) {}

    async addUser(user: createUserDto): Promise<createUserDto | null> {
        user.password = await hash(user.password, 11)
        const newUser =  await this.prisma.userModel.create({
            data: user
        })
        await this.initListForUser(newUser.id)
        return newUser
    }

    private async initListForUser(userId:number): Promise<null>{
        const names = await this.listService.getAllNames();
        const updNames = names.map((name, index) => (
             { "nameId": name.id,
              userId,
              "order": index
            }  
        ))

        await this.prisma.orders.createMany({
                data: updNames
             })
        
        return null
    }

    async loginUser(user: loginUserDto): Promise<loginUserDto | null> {
        
        const res = await this.prisma.userModel.findFirst({
            where: {
                email: user.email
            }
        })
        if (await compare(user.password, res.password)){
            return res;
        } else{
            return null
        }
    }

}
