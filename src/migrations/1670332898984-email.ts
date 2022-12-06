import { MigrationInterface, QueryRunner } from "typeorm";

export class email1670332898984 implements MigrationInterface {
    name = 'email1670332898984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "UQ_fee9013b697946e8129caba8983" UNIQUE ("email"), CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "email"`);
    }

}
