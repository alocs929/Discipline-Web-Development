import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationshipTradingsNcms1602299669536
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tradings_ncms',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'trading_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'ncm_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tradings_ncms',
      new TableForeignKey({
        name: 'TradingId',
        columnNames: ['trading_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tradings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tradings_ncms',
      new TableForeignKey({
        name: 'NcmId',
        columnNames: ['ncm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ncms',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tradings_ncms', 'TradingId');
    await queryRunner.dropForeignKey('tradings_ncms', 'NcmId');
    await queryRunner.dropTable('tradings_ncms');
  }
}
