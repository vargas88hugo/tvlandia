import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TvServiceModule } from './tv-service/tv-service.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TvServiceModule],
})
export class AppModule {}
