import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAgendamentoToprofissionalId1615476926990
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendamentos', 'profissional');

    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'profissional_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        name: 'agendamentoProfissional',
        columnNames: ['profissional_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'agendamentoProfissional');
    await queryRunner.dropColumn('agendamentos', 'profissional_id');
    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'profissional',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
