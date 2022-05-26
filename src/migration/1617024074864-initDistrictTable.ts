import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class initDistrictTable1617024074864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'District',
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
          name: 'number',
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'address',
          type: 'varchar',
          length: '100',
          isNullable: true,
        },
        {
          name: 'workingHours',
          type: 'varchar',
          length: '100',
          isNullable: true,
        },
        {
          name: 'headManager',
          type: 'varchar',
          length: '200',
          isNullable: true,
        },
        {
          name: 'manager',
          type: 'varchar',
          length: '200',
          isNullable: true,
        },
        {
          name: 'phones',
          type: 'text',
          isArray: true,
          isNullable: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('District');
  }
}
