import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class createReviewForeignKey1617125438177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const foreignKey = new TableForeignKey({
      columnNames: ['houseId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'House',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('Review', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const foreignKey = new TableForeignKey({
      columnNames: ['houseId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'House',
      onDelete: 'CASCADE',
    });

    await queryRunner.dropForeignKey('Review', foreignKey);
  }
}
