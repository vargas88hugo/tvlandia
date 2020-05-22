import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TicketsModule],
})
export class AppModule {}
