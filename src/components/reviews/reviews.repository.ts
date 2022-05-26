import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import ReviewsUpdateDto from '@components/reviews/dto/reviews-update.dto';
import ReviewCreateDto from '@components/reviews/dto/review-create.dto';
import ReviewsListDto from '@components/reviews/dto/reviews-list.dto';
import ReviewsDto from '@components/reviews/dto/reviews.dto';
import ReviewEntity from '@components/reviews/review.entity';

@Injectable()
export default class ReviewsRepository {
  constructor(
    @InjectRepository(ReviewEntity) private reviewsModel: Repository<ReviewEntity>,
  ) {
  }

  public getById(id: number): Promise<ReviewEntity | undefined> {
    return this.reviewsModel.findOne({
      where: { id },
      relations: ['house'],
    });
  }

  public async createReview(review: ReviewCreateDto): Promise<ReviewEntity | undefined> {
    const { id } = await this.reviewsModel.save({
      ...review,
      verified: false,
    });

    return this.getById(id);
  }

  public findReview(where: any): Promise<ReviewEntity[] | undefined> {
    return this.reviewsModel.find({
      where,
      relations: ['house'],
    });
  }

  public async updateReviews(reviews: ReviewsUpdateDto): Promise<ReviewEntity[] | undefined> {
    await this.reviewsModel
      .createQueryBuilder()
      .update()
      .set({ verified: reviews.verified })
      .where({ id: In(reviews.reviews) })
      .execute();

    return this.findReview({ id: In(reviews.reviews) });
  }

  public removeReviews(reviews: ReviewsDto): Promise<any | null> {
    return this.reviewsModel.delete(reviews.reviews);
  }

  public async getReviews(reviewsOptions: ReviewsListDto): Promise<ReviewEntity[] | null> {
    // const { sortField, sortDirection, search } = reviewsOptions;
    const limit = parseInt(reviewsOptions.limit, 10);
    const page = parseInt(reviewsOptions.page, 10) - 1;
    // const find = $search ? { $text: { $search } } : {};

    return this.reviewsModel.createQueryBuilder('review')
      .innerJoinAndSelect('review.house', 'house')
      // .where('house.street ILIKE :street', { street: '%Sob%' })
      .limit(limit)
      .skip(limit * page)
      .getMany();

    //
    // return this.reviewsModel.find({
    //   where: {
    //     house: {
    //       street: ILike('%Sob%'),
    //     },
    //   },
    //   order: { [sortField]: sortDirection },
    // });
  }

  public countReviews(): Promise<number | null> {
    return this.reviewsModel.count();
  }
}
