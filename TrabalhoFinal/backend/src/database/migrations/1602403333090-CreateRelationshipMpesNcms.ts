import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationshipMpesNcms1602403333090
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mpes_ncms',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'mpe_id',
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
      'mpes_ncms',
      new TableForeignKey({
        name: 'MpeId',
        columnNames: ['mpe_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'mpes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'mpes_ncms',
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
    await queryRunner.dropForeignKey('mpes_ncms', 'MpeId');
    await queryRunner.dropForeignKey('mpes_ncms', 'NcmId');
    await queryRunner.dropTable('mpes_ncms');
  }
}
