import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { namesDto } from './dto/names.dto';

@Injectable()
export class ListService {

    constructor(private prisma: PrismaService) {}

    async getAllNames(): Promise<namesDto[]>{
        return await this.prisma.listOfNames.findMany()
    }
}
