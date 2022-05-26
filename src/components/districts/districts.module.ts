import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import DistrictsController from '@components/districts/districts.controller';
import DistrictsRepository from '@components/districts/districts.repository';
import DistrictsService from '@components/districts/districts.service';
import DistrictEntity from '@components/districts/district.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistrictEntity]),
  ],
  controllers: [
    DistrictsController,
  ],
  providers: [
    DistrictsService,
    DistrictsRepository,
  ],
  exports: [
    DistrictsService,
    DistrictsRepository,
  ],
})
export default class DistrictsModule {
}
