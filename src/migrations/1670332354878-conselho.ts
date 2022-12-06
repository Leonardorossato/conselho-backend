import { MigrationInterface, QueryRunner } from "typeorm";

export class conselho1670332354878 implements MigrationInterface {
    name = 'conselho1670332354878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conselho" ("id" SERIAL NOT NULL, "texto" character varying NOT NULL, "traducao" character varying NOT NULL, CONSTRAINT "PK_330f0eef7beb3cdf45977e87a3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "conselho"`);
    }

}
