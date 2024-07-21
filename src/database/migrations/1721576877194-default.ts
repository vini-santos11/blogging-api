import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721576877194 implements MigrationInterface {
    name = 'Default1721576877194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-12 00:50:10.813'`);
    }

}
