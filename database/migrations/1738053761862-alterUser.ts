import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUser1738053761862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.changeColumn(
      'user',
      'role',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: ['user', 'admin'],
        default: "'user'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.changeColumn(
      'user',
      'role',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        length: '128',
        enum: ['user', 'admin'],
      }),
    );
  }
}
