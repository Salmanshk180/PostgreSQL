import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPost1711453220248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO migrationdb.post (id,title, text) VALUES (1,'title1', 'text1')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
