import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class initReviewTable1617024083707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Review',
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
          name: 'review',
          type: 'integer',
          default: 5,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '200',
        },
        {
          name: 'comment',
          type: 'text',
        },
        {
          name: 'ip',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'verified',
          type: 'boolean',
          default: false,
        },
        {
          name: 'houseId',
          type: 'int',
          isNullable: false,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Review');
  }
}
