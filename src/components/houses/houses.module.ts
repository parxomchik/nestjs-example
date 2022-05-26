import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import HousesRepository from '@components/houses/houses.repository';
import HousesController from '@components/houses/houses.controller';
import ReviewsModule from '@components/reviews/reviews.module';
import HousesService from '@components/houses/houses.service';
import HouseEntity from '@components/houses/house.entity';

@Module({
  imports: [
    forwardRef(() => ReviewsModule),
    TypeOrmModule.forFeature([HouseEntity]),
  ],
  controllers: [
    HousesController,
  ],
  providers: [
    HousesService,
    HousesRepository,
  ],
  exports: [
    HousesService,
    HousesRepository,
  ],
})
export default class HousesModule {}
