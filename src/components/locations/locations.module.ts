import { Module } from '@nestjs/common';
import LocationsController from '@components/locations/locations.controller';
import { LocationsService } from '@components/locations/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocationEntity from './entities/location.entity';
import RegionEntity from './entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity, RegionEntity]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})

export default class LocationsModule {
}
