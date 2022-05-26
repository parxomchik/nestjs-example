import { Injectable } from '@nestjs/common';

import StreetAutocompleteDto from '@components/houses/dto/street-autocomplete.dto';
import HouseCreateDto from '@components/houses/dto/house-create.dto';
import HousesRepository from '@components/houses/houses.repository';
import HousesListDto from '@components/houses/dto/houses-list.dto';
import HouseEntity from '@components/houses/house.entity';
import HousesDto from '@components/houses/dto/houses.dto';
import HousesListByDto from '@components/houses/dto/houses-list-by.dto';

@Injectable()
export default class HousesService {
  constructor(
    private housesRepository: HousesRepository,
  ) {
  }

  public getById(id: number): Promise<HouseEntity | undefined> {
    return this.housesRepository.getById(id);
  }

  public async findHouse(conditions: any): Promise<HouseEntity[] | undefined> {
    return this.housesRepository.findHouse(conditions);
  }

  public createHouse(house: HouseCreateDto): Promise<HouseEntity | undefined> {
    return this.housesRepository.createHouse(house);
  }

  public async updateHouse(id: number, house: HouseCreateDto | any): Promise<HouseEntity | undefined> {
    return this.housesRepository.updateHouse(id, house);
  }

  public async removeHouses(houses: HousesDto): Promise<any | undefined> {
    return this.housesRepository.removeHouses(houses);
  }

  public async getHouses(housesOptions: HousesListDto): Promise<HouseEntity[] | undefined> {
    return this.housesRepository.getHouses(housesOptions);
  }

  public async getHousesBy(housesOptions: HousesListByDto): Promise<HouseEntity | HouseEntity[] | null> {
    const houses: any = await this.housesRepository.getHousesBy(housesOptions);
    const average = (arr: any[]) => arr.reduce((p, c) => p + c.review, 0) / arr.length;

    const housesWithRating = houses.map((house: any) => {
      const updatedHouse = house;
      const reviews = house.reviews.filter((review: any) => review.verified);

      if (reviews.length) {
        updatedHouse.rating = Math.round(average(reviews));
      } else {
        updatedHouse.rating = 0;
      }

      return { ...updatedHouse, reviews };
    });

    return housesOptions.number && housesOptions.street && housesWithRating?.length === 1
      ? housesWithRating[0]
      : housesWithRating;
  }

  public async countHouses(): Promise<number | undefined> {
    return this.housesRepository.countHouses();
  }

  public async streetAutocomplete(query: StreetAutocompleteDto): Promise<any | undefined> {
    const streets = await this.housesRepository.streetAutocomplete(query);

    return streets?.map(({ street }) => street);
  }

  public async housesAutocomplete(query: StreetAutocompleteDto): Promise<any | undefined> {
    const houses = await this.housesRepository.housesAutocomplete(query);

    return houses?.map(({ number }) => number);
  }
}
