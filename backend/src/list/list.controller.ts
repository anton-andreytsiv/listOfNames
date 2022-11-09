import { Controller, Get } from '@nestjs/common';
import { namesDto } from './dto/names.dto';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
    constructor (private listService: ListService){}

    @Get()
    async getAllNames(): Promise<namesDto[]>{
        return await this.listService.getAllNames()
    }
    
}
