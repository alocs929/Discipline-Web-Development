import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMpes1602402254047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mpes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'perfil_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'razao_social',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'telephone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mpes');
  }
}
