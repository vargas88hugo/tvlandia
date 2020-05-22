import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { TvServiceType } from '../helpers/tv-service-type.enum';

export class CreateTvServiceDto {
  @IsNotEmpty()
  description: string;

  observations: string;

  @IsIn([TvServiceType.INSTALATION, TvServiceType.MAINTENANCE])
  @IsNotEmpty()
  serviceType: TvServiceType;
}
