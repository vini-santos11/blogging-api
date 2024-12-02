import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733104400319 implements MigrationInterface {
    name = 'Default1733104400319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedBy" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "updatedBy" SET NOT NULL`);
    }

}
