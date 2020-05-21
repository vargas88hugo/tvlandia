import { Module } from '@nestjs/common';
import { ClientsController } from './clients/clients/clients.controller';
import { ClientsService } from './clients/clients/clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class UsersModule {}
