import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';

import StreetAutocompleteDto from '@components/houses/dto/street-autocomplete.dto';
import HouseCreateDto from '@components/houses/dto/house-create.dto';
import HousesListDto from '@components/houses/dto/houses-list.dto';
import HousesDto from '@components/houses/dto/houses.dto';
import HouseEntity from '@components/houses/house.entity';
import HousesListByDto from '@components/houses/dto/houses-list-by.dto';

@Injectable()
export default class HousesRepository {
  constructor(
    @InjectRepository(HouseEntity) private housesModel: Repository<HouseEntity>,
  ) {
  }

  public getById(id: number): Promise<HouseEntity | undefined> {
    return this.housesModel.findOne({
      where: { id },
      relations: ['reviews', 'district'],
    });
  }

  public findHouse(where: any): Promise<HouseEntity[] | undefined> {
    return this.housesModel.find({
      where,
      relations: ['reviews', 'district'],
    });
  }

  public async createHouse(house: HouseCreateDto): Promise<HouseEntity | undefined> {
    const { id } = await this.housesModel.save(house);
    return this.getById(id);
  }

  public async updateHouse(id: number, house: HouseCreateDto): Promise<HouseEntity | undefined> {
    await this.housesModel.update({ id }, { ...house });
    return this.getById(id);
  }

  public removeHouses(houses: HousesDto): Promise<any | undefined> {
    return this.housesModel.delete(houses.houses);
  }

  public getHouses(housesOptions: HousesListDto): Promise<HouseEntity[] | undefined> {
    const limit = parseInt(housesOptions.limit, 10);
    const page = parseInt(housesOptions.page, 10);

    return this.housesModel.find({
      take: limit,
      skip: limit * page,
      order: { updatedAt: 'ASC' },
      relations: ['reviews', 'district'],
    });
  }

  public countHouses(): Promise<number | undefined> {
    return this.housesModel.count({});
  }

  public streetAutocomplete(query: StreetAutocompleteDto): Promise<HouseEntity[] | undefined> {
    return this.housesModel.find({ where: [{ street: ILike(`%${query.street}%`) }] });
  }

  public housesAutocomplete(query: StreetAutocompleteDto): Promise<HouseEntity[] | undefined> {
    return this.housesModel.find({ where: [{ street: ILike(`%${query.street}%`) }] });
  }

  public getHousesBy(housesOptions: HousesListByDto): Promise<HouseEntity | HouseEntity[] | null> {
    const { street, number } = housesOptions;

    const limit = parseInt(housesOptions.limit, 10);
    const page = parseInt(housesOptions.page, 10);

    const housesQuery = this.housesModel.createQueryBuilder('house')
      .leftJoinAndSelect('house.reviews', 'review')
      .leftJoinAndSelect('house.district', 'district')
      .where('house.street = :street', { street });

    if (number !== 'null') {
      housesQuery.andWhere('house.number = :number', { number });
    }

    return housesQuery
      .limit(limit)
      .skip(limit * page)
      .getMany();
  }
}
