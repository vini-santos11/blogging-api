import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1738520328679 implements MigrationInterface {
    name = 'Default1738520328679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text, "phone" text NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "email" text, "phone" text NOT NULL, "identifier" text NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_supplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "identifier" text NOT NULL, "teacher_id" uuid, CONSTRAINT "PK_7a9e5080e2650d39fadf9a75243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "content" text NOT NULL, "author" text NOT NULL, "updatedBy" text, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_school_supplies" ("student_id" uuid NOT NULL, "school_supplies_id" uuid NOT NULL, CONSTRAINT "PK_b83082d67778a7f23e5195fef69" PRIMARY KEY ("student_id", "school_supplies_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7ea04fa6465ef0582c4a642b3f" ON "student_school_supplies" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c75828a5460e56a0732e4e82bc" ON "student_school_supplies" ("school_supplies_id") `);
        await queryRunner.query(`ALTER TABLE "school_supplies" ADD CONSTRAINT "FK_dffe17f9100a815a54366e350e7" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_school_supplies" ADD CONSTRAINT "FK_7ea04fa6465ef0582c4a642b3f9" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_school_supplies" ADD CONSTRAINT "FK_c75828a5460e56a0732e4e82bc3" FOREIGN KEY ("school_supplies_id") REFERENCES "school_supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_school_supplies" DROP CONSTRAINT "FK_c75828a5460e56a0732e4e82bc3"`);
        await queryRunner.query(`ALTER TABLE "student_school_supplies" DROP CONSTRAINT "FK_7ea04fa6465ef0582c4a642b3f9"`);
        await queryRunner.query(`ALTER TABLE "school_supplies" DROP CONSTRAINT "FK_dffe17f9100a815a54366e350e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c75828a5460e56a0732e4e82bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ea04fa6465ef0582c4a642b3f"`);
        await queryRunner.query(`DROP TABLE "student_school_supplies"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "school_supplies"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
