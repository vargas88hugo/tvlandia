import { Module } from '@nestjs/common';
import { TvServiceController } from './tv-service.controller';
import { TvServiceService } from './tv-service.service';

@Module({
  controllers: [TvServiceController],
  providers: [TvServiceService]
})
export class TvServiceModule {}
