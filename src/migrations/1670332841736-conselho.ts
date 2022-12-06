import { MigrationInterface, QueryRunner } from "typeorm";

export class conselho1670332841736 implements MigrationInterface {
    name = 'conselho1670332841736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conselho" ("id" BIGINT NOT NULL, "texto" character varying NOT NULL, "traducao" character varying, CONSTRAINT "UQ_16cb9f8782874425d22eba31743" UNIQUE ("texto"), CONSTRAINT "PK_330f0eef7beb3cdf45977e87a3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "conselho"`);
    }

}
