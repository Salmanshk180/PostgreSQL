import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTitleToContent1711520915843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE migrationdb.post RENAME "text"  TO "content"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE migrationdb.post RENAME "content"  TO 'text'`
        )
    }

}
