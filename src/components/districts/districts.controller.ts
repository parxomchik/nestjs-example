import {
  Body, Controller, Get, HttpCode, HttpStatus,
  NotFoundException, Param, Post, Query,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiBody,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiParam, ApiTags,
} from '@nestjs/swagger';
import { In } from 'typeorm';

import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import DistrictCreateDto from '@components/districts/dto/district-create.dto';
import DistrictsListDto from '@components/districts/dto/districts-list.dto';
import DistrictsService from '@components/districts/districts.service';
import ServerErrorResponse from '@responses/server-error.response';
import DistrictEntity from '@components/districts/district.entity';
import DistrictsDto from '@components/districts/dto/districts.dto';
import BadRequestResponse from '@responses/bad-request.response';
import ConflictResponse from '@responses/conflict.response';
import SuccessResponse from '@responses/success.response';
import JwtAccessGuard from '@guards/jwt-access.guard';
import AppUtils from '@components/app/app.utils';

@ApiTags('Districts')
@UseInterceptors(WrapResponseInterceptor)
@Controller('districts')
export default class DistrictsController {
  constructor(
    private districtsService: DistrictsService,
  ) {
  }

  @ApiBody({ type: DistrictCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(DistrictEntity),
    description: '201, Success',
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: '400. ValidationException',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('create')
  public async createDistrict(@Body() districtCreateDto: DistrictCreateDto): Promise<SuccessResponse | ConflictResponse | []> {
    const district = await this.districtsService.createDistrict(districtCreateDto);

    return new SuccessResponse('District created successfully.', district);
  }

  @ApiBody({ type: DistrictCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(DistrictEntity),
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
  @ApiParam({ name: 'id', type: Number })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('update/:id')
  public async updateDistrict(
    @Param('id') id: number,
    @Body() districtCreateDto: DistrictCreateDto,
  ): Promise<SuccessResponse | ConflictResponse | []> {
    const foundDistrict = await this.districtsService.getById(id);

    if (!foundDistrict) {
      throw new NotFoundException('District with given ID doesn\'t exist');
    }

    const updatedDistrict = await this.districtsService.updateDistrict(id, districtCreateDto);

    return new SuccessResponse('District successfully updated', updatedDistrict);
  }

  @ApiBody({ type: DistrictsDto })
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
  public async removeDistricts(@Body() districtsDto: DistrictsDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundDistrict = await this.districtsService.findDistrict({ id: In(districtsDto.districts) });

    if (!foundDistrict?.length) {
      throw new NotFoundException('One or many of given districts does\'t exist');
    }

    await this.districtsService.removeDistricts(districtsDto);

    return new SuccessResponse(null, { success: true });
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(DistrictEntity),
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
  public async getDistricts(@Query() districtsListDto: DistrictsListDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const districts = await this.districtsService.getDistricts(districtsListDto);
    const count = await this.districtsService.countDistricts() || 0;

    return new SuccessResponse('District List', {
      districts,
      page: parseInt(districtsListDto.page, 10),
      count,
    });
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get(':id')
  public async getDistrict(
    @Param('id') id: number,
  ): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundDistrict = await this.districtsService.getById(id);

    if (!foundDistrict) {
      throw new NotFoundException('District with given id not found.');
    }

    return new SuccessResponse(null, foundDistrict);
  }
}
