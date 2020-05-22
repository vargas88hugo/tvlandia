import { Module } from '@nestjs/common';
import { TvServiceController } from './tv-service.controller';
import { TvServiceService } from './tv-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvServiceRepository } from './tv-service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TvServiceRepository])],
  controllers: [TvServiceController],
  providers: [TvServiceService],
})
export class TvServiceModule {}
