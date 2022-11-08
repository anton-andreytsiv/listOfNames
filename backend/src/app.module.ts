import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ListController],
  providers: [AppService, ListService, UsersService, PrismaService],
})
export class AppModule {}
