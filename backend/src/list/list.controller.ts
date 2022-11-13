import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
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

    @Get(':id')
    async getOrdersByUserId(@Param() params): Promise<ordersDto[]>{
        return await this.listService.getOrdersByUserId(params.id)
    }
 

    @Post('saveList')
    @HttpCode(200)
    async saveList(@Body() data: {list: namesDto[], userId: number}): Promise<String | null>{
    return await this.listService.saveList(data.list, data.userId)
    }

    @Post('addName')
    @HttpCode(200)
    async addName(@Body() data: {name: string}): Promise<namesDto | null>{
    return await this.listService.addName(data.name)
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: {name: string}): Promise<namesDto>{
      return await this.listService.updateName(Number(id), data.name)
    }

    @Delete(':id')
    async delName (@Param('id') id: number) {
    return await this.listService.delName(Number(id))
  }
}
