import { MigrationInterface, QueryRunner } from "typeorm";

export class emailEnviado1670335500792 implements MigrationInterface {
    name = 'emailEnviado1670335500792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_enviado" ("id" SERIAL NOT NULL, "data" character varying NOT NULL, "emailId" integer, "conselhoId" integer, CONSTRAINT "PK_9c979eb4600cc424c635221f60d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_enviado" ADD CONSTRAINT "FK_db258dad5caedb1c291f631ee16" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email_enviado" ADD CONSTRAINT "FK_a65d250f7d1c72a348f2be5d152" FOREIGN KEY ("conselhoId") REFERENCES "conselho"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_enviado" DROP CONSTRAINT "FK_a65d250f7d1c72a348f2be5d152"`);
        await queryRunner.query(`ALTER TABLE "email_enviado" DROP CONSTRAINT "FK_db258dad5caedb1c291f631ee16"`);
        await queryRunner.query(`DROP TABLE "email_enviado"`);
    }

}
