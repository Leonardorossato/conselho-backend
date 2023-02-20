import { MigrationInterface, QueryRunner } from "typeorm";

export class emailEnviado1670871254631 implements MigrationInterface {
    name = 'emailEnviado1670871254631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_enviado" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, "emailId" integer NOT NULL, "conselhoId" integer NOT NULL, CONSTRAINT "PK_9c979eb4600cc424c635221f60d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_enviado"`);
    }

}
