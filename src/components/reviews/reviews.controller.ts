import {
  Body, ConflictException, Controller, Get,
  HttpCode, HttpStatus,
  NotFoundException, Post,
  Query, Request, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody, ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { In } from 'typeorm';

import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import JwtAccessGuard from '@guards/jwt-access.guard';
import BadRequestResponse from '@responses/bad-request.response';
// import ConflictResponse from '@responses/conflict.response';
import ServerErrorResponse from '@responses/server-error.response';
import ReviewCreateDto from '@components/reviews/dto/review-create.dto';
import ReviewsService from '@components/reviews/reviews.service';
import SuccessResponse from '@responses/success.response';
import HousesService from '@components/houses/houses.service';
import ReviewsUpdateDto from '@components/reviews/dto/reviews-update.dto';
import ReviewsDto from '@components/reviews/dto/reviews.dto';
import AppUtils from '@components/app/app.utils';
import ReviewsListDto from '@components/reviews/dto/reviews-list.dto';
import ReviewEntity from '@components/reviews/review.entity';

@ApiTags('Reviews')
@UseInterceptors(WrapResponseInterceptor)
@Controller('reviews')
export default class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private housesService: HousesService,
  ) {
  }

  @ApiBody({ type: ReviewCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(ReviewEntity),
    description: '201, Create review entity',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: '400. ValidationException',
  })
  @ApiConflictResponse({
    type: ConflictException,
    description: '409. ConflictResponse',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async createReview(
    @Request() request: ExpressRequest,
    @Body() body: ReviewCreateDto,
  ): Promise<SuccessResponse | ConflictException | []> {
    const house = await this.housesService.getById(body.house);
    const { ip } = request;

    if (!house) {
      throw new NotFoundException('The house does not exist');
    }

    const review = await this.reviewsService.findReview({
      ip,
      house: body.house,
    });

    if (review?.length) {
      throw new ConflictException('You already posted review for this house.');
    }

    const newReview = await this.reviewsService.creteReview({ ...body, ip });

    return new SuccessResponse('Review successfully created', newReview);
  }

  @ApiBody({ type: ReviewsUpdateDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: '400. ValidationException',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('update')
  public async updateReview(@Body() reviews: ReviewsUpdateDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundReviews = await this.reviewsService.findReview({ id: In(reviews.reviews) });

    if (!foundReviews?.length) {
      throw new NotFoundException('One or many of given review\'s does\'t exist');
    }

    const updatedReviews = await this.reviewsService.updateReviews(reviews);

    return new SuccessResponse(null, updatedReviews);
  }

  @ApiBody({ type: ReviewsDto })
  @ApiOkResponse({
    type: SuccessResponse,
    description: '200, Success',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('remove')
  public async removeReview(@Body() reviews: ReviewsDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundReviews = await this.reviewsService.findReview({ id: In(reviews.reviews) });

    if (!foundReviews?.length) {
      throw new NotFoundException('One or many of given review\'s does\'t exist');
    }

    await this.reviewsService.removeReviews(reviews);

    return new SuccessResponse(null, { success: true });
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(ReviewEntity),
    description: '200, Success',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get('list')
  public async getReviews(@Query() reviewsOptions: ReviewsListDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const reviews = await this.reviewsService.getReviews(reviewsOptions);
    const count = await this.reviewsService.countReviews() || 0;

    return new SuccessResponse('Reviews List', {
      reviews,
      count,
      page: parseInt(reviewsOptions.page, 10),
      pages: Math.ceil(count / parseInt(reviewsOptions.limit, 10)),
    });
  }
}
