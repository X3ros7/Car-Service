import { MigrationInterface, QueryRunner, Table, TableCheck } from 'typeorm';

export class CreateCar1737896020824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'brand',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'year',
            type: 'smallint',
          },
          {
            name: 'color',
            type: 'varchar',
            length: '128',
          },
        ],
      }),
    );

    await queryRunner.createCheckConstraint(
      'car',
      new TableCheck({
        expression: `"year" > 1900 AND "year" < extract(year from now())`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('car');
  }
}
