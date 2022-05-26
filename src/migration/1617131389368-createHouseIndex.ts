import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class createHouseIndex1617131389368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex('House', new TableIndex({
      name: 'HousesIndex',
      columnNames: ['street', 'number'],
      isFulltext: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('House', 'HousesIndex');
  }
}
