import { MigrationInterface, QueryRunner } from "typeorm";

export class emailEnviado1670335500792 implements MigrationInterface {
    name = 'emailEnviado1670335500792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_enviado" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, "emailId" integer, "conselhoId" integer, CONSTRAINT "PK_9c979eb4600cc424c635221f60d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email_enviado"`);
    }

}
