import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { namesDto } from './dto/names.dto';
import { ordersDto } from './dto/orders.dto';

@Injectable()
export class ListService {

    constructor(private prisma: PrismaService) {}

    async getAllNames(): Promise<namesDto[]>{
        return await this.prisma.listOfNames.findMany()
    }

    async saveList(list:namesDto[], userId: number): Promise<String | null>{
       const trx =  list.map((item, index) => {
            return this.prisma.orders.update({
                where: {
                    userId_nameId: {  
                        userId: Number(userId),
                        nameId: item.id
                    }
                },
                data: {
                    order: index
                }
            })    
        })
        await  this.prisma.$transaction(trx)

        return "done"
    }

    async getOrdersByUserId(userId:number): Promise<ordersDto[]>{
        return this.prisma.orders.findMany({
            where: {
                userId
            }       
        })
    }
    async getOrders(): Promise<ordersDto[]>{
        return this.prisma.orders.findMany()
    }
}
