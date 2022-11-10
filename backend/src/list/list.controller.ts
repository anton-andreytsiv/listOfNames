import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { namesDto } from './dto/names.dto';
import { ordersDto } from './dto/orders.dto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor (private listService: ListService){}

    @Get()
    async getAllNames(): Promise<namesDto[]>{
        return await this.listService.getAllNames()
    }

    // @Get(':id')
    // async getOrdersByUserId(@Param() params): Promise<ordersDto[]>{
    //     return await this.listService.getOrdersByUserId(params.id)
    // }
    @Get('orders')
    async getOrders(): Promise<ordersDto[]>{
        return await this.listService.getOrders()
    }

    @Post('saveList')
    @HttpCode(200)
    async saveList(@Body() data: {list: namesDto[], userId: number}): Promise<String | null>{
    return await this.listService.saveList(data.list, data.userId)
    }
    
}
