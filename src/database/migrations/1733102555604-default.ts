import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1733102555604 implements MigrationInterface {
    name = 'Default1733102555604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "author" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedBy" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "title" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "content" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-26 23:39:00.643'`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "author"`);
    }

}
