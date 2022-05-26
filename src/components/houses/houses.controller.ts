import {
  Body,
  Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiParam,
  ApiTags, ApiBody,
} from '@nestjs/swagger';
import { In } from 'typeorm';

import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import JwtAccessGuard from '@guards/jwt-access.guard';
import SuccessResponse from '@responses/success.response';
import StreetAutocompleteDto from '@components/houses/dto/street-autocomplete.dto';
import BadRequestResponse from '@responses/bad-request.response';
import ServerErrorResponse from '@responses/server-error.response';
import HouseCreateDto from '@components/houses/dto/house-create.dto';
import AppUtils from '@components/app/app.utils';
import HousesService from '@components/houses/houses.service';
import ConflictResponse from '@responses/conflict.response';
import HousesListDto from '@components/houses/dto/houses-list.dto';
import HousesDto from '@components/houses/dto/houses.dto';
import HouseEntity from '@components/houses/house.entity';
import HousesListByDto from '@components/houses/dto/houses-list-by.dto';

@ApiTags('Houses')
@UseInterceptors(WrapResponseInterceptor)
@Controller('houses')
export default class HousesController {
  constructor(
    private housesService: HousesService,
  ) {
  }

  @ApiBody({ type: HouseCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(HouseEntity),
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
  public async createHouse(@Body() house: HouseCreateDto): Promise<SuccessResponse | ConflictResponse | []> {
    const foundHouse = await this.housesService.findHouse({
      street: house.street,
      number: house.number,
    });

    if (foundHouse?.length) {
      throw new BadRequestResponse('House with given street and number already exists.');
    }

    const newHouse = await this.housesService.createHouse(house);

    return new SuccessResponse('House created successfully.', newHouse);
  }

  @ApiBody({ type: HouseCreateDto })
  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(HouseEntity),
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
  @ApiParam({ name: 'id', type: String })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('update/:id')
  public async updateHouse(
    @Param('id') id: number,
    @Body() house: HouseCreateDto,
  ): Promise<SuccessResponse | ConflictResponse | []> {
    const foundHouse = await this.housesService.getById(id);

    if (!foundHouse) {
      throw new NotFoundException('House with given ID doesn\'t exist');
    }

    if (
      foundHouse.number === house.number
      && foundHouse.street === house.street
      && foundHouse.id !== id
    ) {
      throw new BadRequestResponse('House with given street and number already exists.');
    }

    const updateHouse = await this.housesService.updateHouse(id, house);

    return new SuccessResponse('House successfully updated', updateHouse);
  }

  @ApiBody({ type: HousesDto })
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
  public async removeHouses(@Body() houses: HousesDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundHouse = await this.housesService.findHouse({ id: In(houses.houses) });

    if (!foundHouse?.length) {
      throw new NotFoundException('One or many of given houses does\'t exist');
    }

    await this.housesService.removeHouses(houses);

    return new SuccessResponse(null, { success: true });
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(HouseEntity),
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
  public async getHouses(@Query() housesOptions: HousesListDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const houses = await this.housesService.getHouses(housesOptions);
    const count = await this.housesService.countHouses() || 0;

    return new SuccessResponse('Houses List', {
      houses,
      page: parseInt(housesOptions.page, 10),
      count,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('streets-autocomplete')
  public async streetAutocomplete(
    @Query() autocompleteDto: StreetAutocompleteDto,
  ): Promise<SuccessResponse | BadRequestResponse | []> {
    const streets = await this.housesService.streetAutocomplete(autocompleteDto);
    return new SuccessResponse(null, streets);
  }

  @Get('houses-autocomplete')
  public async housesAutocomplete(
    @Query() autocompleteDto: StreetAutocompleteDto,
  ): Promise<SuccessResponse | BadRequestResponse | []> {
    const houses = await this.housesService.housesAutocomplete(autocompleteDto);
    return new SuccessResponse(null, houses);
  }

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(HouseEntity),
    description: '200, Success',
  })
  @ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.OK)
  @Get('list-by')
  public async getHousesBy(@Query() housesOptions: HousesListByDto): Promise<SuccessResponse | BadRequestResponse | []> {
    const houses = await this.housesService.getHousesBy(housesOptions);
    const count = await this.housesService.countHouses() || 0;

    return new SuccessResponse('Houses List', {
      houses,
      page: parseInt(housesOptions.page, 10),
      pages: Math.ceil(count / parseInt(housesOptions.limit, 10)),
    });
  }

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  public async getHouse(
    @Param('id') id: number,
  ): Promise<SuccessResponse | BadRequestResponse | []> {
    const foundHouse = await this.housesService.getById(id);

    if (!foundHouse) {
      throw new NotFoundException('House with given id not found.');
    }

    return new SuccessResponse(null, foundHouse);
  }
}
