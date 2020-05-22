import { Module } from '@nestjs/common';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './clients/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class UsersModule {}
