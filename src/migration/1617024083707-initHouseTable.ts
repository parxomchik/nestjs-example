import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class initHouseTable1617024092776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'House',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'createAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'street',
          type: 'varchar',
          length: '150',
          isNullable: false,
        },
        {
          name: 'number',
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'location',
          type: 'json',
        },
        {
          name: 'districtId',
          type: 'int',
          isNullable: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('House');
  }
}
