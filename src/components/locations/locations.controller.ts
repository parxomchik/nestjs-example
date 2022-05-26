import {
  ConflictException, Controller, HttpCode, HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiTags,
} from '@nestjs/swagger';
// import { Request as ExpressRequest } from 'express';

import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import BadRequestResponse from '@responses/bad-request.response';
// import ConflictResponse from '@responses/conflict.response';
import ServerErrorResponse from '@responses/server-error.response';
import SuccessResponse from '@responses/success.response';
import AppUtils from '@components/app/app.utils';
import { LocationsService } from './locations.service';
import RegionCreateDto from './dto/region-create.dto';
import RegionEntity from './entities/region.entity';

@ApiTags('Locations')
@UseInterceptors(WrapResponseInterceptor)
@Controller('locations')
export default class ReviewsController {
  constructor(
    private locationsService: LocationsService,
  ) {
  }

  @ApiBody({ type: RegionCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(RegionEntity),
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
  // @Request() request: ExpressRequest,
  // @Body() body: RegionCreateDto,
  ): Promise<SuccessResponse | ConflictException | []> {
    // const house = await this.housesService.getById(body.house);
    // const { ip } = request;

    // if (!house) {
    //  throw new NotFoundException('The house does not exist');
    // }

    // const review = await this.reviewsService.findReview({
    //  ip,
    //  house: body.house,
    // });

    // if (review?.length) {
    //  throw new ConflictException('You already posted review for this house.');
    // }

    // const newReview = await this.reviewsService.creteReview({ ...body, ip });

    const newRegion = new RegionEntity();

    return new SuccessResponse('Region successfully created', newRegion);
  }
}
