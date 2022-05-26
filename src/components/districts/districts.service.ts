import { Injectable } from '@nestjs/common';

import DistrictsRepository from '@components/districts/districts.repository';
import DistrictCreateDto from '@components/districts/dto/district-create.dto';
import DistrictsListDto from '@components/districts/dto/districts-list.dto';
import DistrictsDto from '@components/districts/dto/districts.dto';
import DistrictEntity from '@components/districts/district.entity';

@Injectable()
export default class DistrictsService {
  constructor(
    private districtsRepository: DistrictsRepository,
  ) {
  }

  public getById(id: number): Promise<DistrictEntity | undefined> {
    return this.districtsRepository.getById(id);
  }

  public findDistrict(conditions: any): Promise<DistrictEntity[] | undefined> {
    return this.districtsRepository.findDistrict(conditions);
  }

  public createDistrict(districtCreateDto: DistrictCreateDto): Promise<DistrictEntity | undefined> {
    return this.districtsRepository.createDistrict(districtCreateDto);
  }

  public updateDistrict(id: number, districtCreateDto: DistrictCreateDto): Promise<DistrictEntity | undefined> {
    return this.districtsRepository.updateDistrict(id, districtCreateDto);
  }

  public removeDistricts(districts: DistrictsDto): Promise<any | null> {
    return this.districtsRepository.removeDistricts(districts);
  }

  public getDistricts(districtsListDto: DistrictsListDto): Promise<DistrictEntity[] | null> {
    return this.districtsRepository.getDistricts(districtsListDto);
  }

  public countDistricts(): Promise<number | null> {
    return this.districtsRepository.countDistricts();
  }
}
