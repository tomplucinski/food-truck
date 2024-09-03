import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1725395984011 implements MigrationInterface {
    name = 'Init1725395984011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_provider" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "locationId" integer NOT NULL, "name" text NOT NULL, "type" text NOT NULL, "address" text NOT NULL, "permitNumber" text NOT NULL, "permitStatus" text NOT NULL, "foodItems" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "hours" text, "permitExpiration" text NOT NULL, CONSTRAINT "PK_e7ef4082005aa432097ae155d43" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "food_provider"`);
    }

}
