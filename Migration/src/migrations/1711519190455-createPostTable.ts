import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostTable1711519190455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "post",
                    columns:
                        [
                            {
                                name: "id",
                                type: "uuid",
                                isPrimary: true,
                                default: "uuid_generate_v4()",
                            },
                            {
                                name: "title",
                                type: "varchar",
                            },
                            {
                                name: "text",
                                type: "varchar",
                            },
                        ],
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("post");
    }

}
