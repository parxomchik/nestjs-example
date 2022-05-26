import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ReviewsRepository from '@components/reviews/reviews.repository';
import ReviewsController from '@components/reviews/reviews.controller';
import ReviewsService from '@components/reviews/reviews.service';
import HousesModule from '@components/houses/houses.module';
import ReviewEntity from '@components/reviews/review.entity';

@Module({
  imports: [
    forwardRef(() => HousesModule),
    TypeOrmModule.forFeature([ReviewEntity]),
  ],
  controllers: [
    ReviewsController,
  ],
  providers: [
    ReviewsService,
    ReviewsRepository,
  ],
  exports: [
    ReviewsService,
    ReviewsRepository,
  ],
})

export default class ReviewsModule {
}
