import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import DistrictCreateDto from '@components/districts/dto/district-create.dto';
import DistrictsListDto from '@components/districts/dto/districts-list.dto';
import DistrictsDto from '@components/districts/dto/districts.dto';
import DistrictEntity from '@components/districts/district.entity';

@Injectable()
export default class DistrictsRepository {
  constructor(
    @InjectRepository(DistrictEntity) private districtsModel: Repository<DistrictEntity>,
  ) {
  }

  public getById(id: number): Promise<DistrictEntity | undefined> {
    return this.districtsModel.findOne({
      where: { id },
      relations: ['houses'],
    });
  }

  public findDistrict(where: any): Promise<DistrictEntity[] | undefined> {
    return this.districtsModel.find({
      where,
      relations: ['houses'],
    });
  }

  public createDistrict(districtCreateDto: DistrictCreateDto): Promise<DistrictEntity | undefined> {
    return this.districtsModel.save(districtCreateDto);
  }

  public async updateDistrict(id: number, districtCreateDto: DistrictCreateDto): Promise<DistrictEntity | undefined> {
    await this.districtsModel.update({ id }, { ...districtCreateDto });
    return this.getById(id);
  }

  public removeDistricts(districts: DistrictsDto): Promise<any | null> {
    return this.districtsModel.delete(districts.districts);
  }

  public getDistricts(districtsListDto: DistrictsListDto): Promise<DistrictEntity[] | null> {
    const limit = parseInt(districtsListDto.limit, 10);
    const page = parseInt(districtsListDto.page, 10);

    return this.districtsModel.find({
      take: limit,
      skip: limit * page,
      order: { updatedAt: 'ASC' },
      relations: ['houses'],
    });
  }

  public countDistricts(): Promise<number | null> {
    return this.districtsModel.count();
  }
}
