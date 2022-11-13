import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { namesDto } from './dto/names.dto';
import { ordersDto } from './dto/orders.dto';

@Injectable()
export class ListService {

    constructor(private prisma: PrismaService) {}

    async getAllNames(): Promise<namesDto[]>{
        return await this.prisma.listOfNames.findMany({
            orderBy:{
                name: 'asc'
            }
        })
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
                userId: Number(userId)
            },
            orderBy:{
                order: 'asc'
            }       
        })
    }
    async getOrders(): Promise<ordersDto[]>{
        return this.prisma.orders.findMany()
    }

    async updateName(id: number, name: string): Promise<namesDto>{
        return await this.prisma.listOfNames.update({
            where:{
                id
            },
            data:{
                name
            }
        })
    }

    async delName(id:number){
        const delListname = await this.prisma.orders.deleteMany({
            where:{
                nameId: id
            }
        })
        return await this.prisma.listOfNames.delete({
            where:{
                id
            }
        })
    }

    async addName(name: string): Promise<namesDto>{
        const newName = await this.prisma.listOfNames.create({
            data:{
                name
            }
        })
        const orderNumber = await this.prisma.orders.findMany({
            orderBy:{
                order: 'desc'
            },
            take: 1
        })
        const order = orderNumber[0].order + 1
        const usersIds = await this.prisma.userModel.findMany({
            select:{
                id: true
            }
        })
        const trx = usersIds.map( el => {
            return this.prisma.orders.create({
                data:{
                    userId: el.id,
                    nameId: newName.id,
                    order
                }
            })
        })
        await  this.prisma.$transaction(trx)
        return newName
    }
}
