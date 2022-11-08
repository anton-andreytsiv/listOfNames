import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createUserDto, loginUserDto } from './dto/users.dto';
import { compare, hash } from 'bcryptjs'
//import { JwtPayload, sign, verify } from "jsonwebtoken";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async addUser(user: createUserDto): Promise<createUserDto | null> {
        user.password = await hash(user.password, 11)
        return await this.prisma.userModel.create({
            data: user
        })
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

    async getNames (){
        return this.prisma.listOfNames.findMany();
    }

    // private async signJwt (id:number, email:string, secret:string): Promise<string>{
	// 	return await sign(
	// 	    {
    //             id,
	// 			email,
	// 			iat: Math.floor(Date.now() / 1000)
    //         },
	// 		secret,
	// 		{
	// 			algorithm: 'HS256'
	// 		})
	// }
}
