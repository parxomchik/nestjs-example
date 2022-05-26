import { Injectable } from '@nestjs/common';

import ReviewCreateWithIpDto from '@components/reviews/dto/review-create-with-ip.dto';
import ReviewsUpdateDto from '@components/reviews/dto/reviews-update.dto';
import ReviewsRepository from '@components/reviews/reviews.repository';
import ReviewsListDto from '@components/reviews/dto/reviews-list.dto';
import ReviewsDto from '@components/reviews/dto/reviews.dto';
import ReviewEntity from '@components/reviews/review.entity';

@Injectable()
export default class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
  ) {
  }

  public async creteReview(review: ReviewCreateWithIpDto): Promise<ReviewEntity | undefined> {
    return this.reviewsRepository.createReview(review);
  }

  public async findReview(conditions: any): Promise<ReviewEntity[] | undefined> {
    return this.reviewsRepository.findReview(conditions);
  }

  public async updateReviews(reviews: ReviewsUpdateDto): Promise<ReviewEntity[] | undefined> {
    return this.reviewsRepository.updateReviews(reviews);
  }

  public async removeReviews(reviews: ReviewsDto): Promise<any | undefined> {
    return this.reviewsRepository.removeReviews(reviews);
  }

  public async getReviews(reviewsOptions: ReviewsListDto): Promise<ReviewEntity[] | null> {
    return this.reviewsRepository.getReviews(reviewsOptions);
  }

  public async countReviews(): Promise<number | null> {
    return this.reviewsRepository.countReviews();
  }
}
