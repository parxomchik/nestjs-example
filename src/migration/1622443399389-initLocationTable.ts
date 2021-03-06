import {MigrationInterface, QueryRunner} from "typeorm";

export class initLocationTable1622443399389 implements MigrationInterface {
    name = 'initLocationTable1622443399389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "HousesIndex"`);
        await queryRunner.query(`CREATE TABLE "Region" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(200) NOT NULL, CONSTRAINT "PK_7db3a94690d9263fc6214b8966d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "code" integer NOT NULL DEFAULT '0', "name" character varying(200) NOT NULL, "type" text NOT NULL, "oldName" character varying(200) NOT NULL, "oldType" text NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "regionId" uuid, CONSTRAINT "PK_d0125e359cde2707aec388b9c59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Review" DROP CONSTRAINT "FK_118c08b03cb591253272341c862"`);
        await queryRunner.query(`ALTER TABLE "Review" DROP CONSTRAINT "PK_4af5ddfa8a65e5571d851e4b752"`);
        await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Review" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Review" ADD CONSTRAINT "PK_4af5ddfa8a65e5571d851e4b752" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "Review"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Review" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "Review"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Review" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "houseId"`);
        await queryRunner.query(`ALTER TABLE "Review" ADD "houseId" uuid`);
        await queryRunner.query(`ALTER TABLE "House" DROP CONSTRAINT "PK_de6499312c70e9a668019a4c7aa"`);
        await queryRunner.query(`ALTER TABLE "House" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "House" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "House" ADD CONSTRAINT "PK_de6499312c70e9a668019a4c7aa" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "documents" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."documents" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" DROP COLUMN "districtId"`);
        await queryRunner.query(`ALTER TABLE "House" ADD "districtId" uuid`);
        await queryRunner.query(`ALTER TABLE "District" DROP CONSTRAINT "PK_3b21403f1d497f5985fdeb9388a"`);
        await queryRunner.query(`ALTER TABLE "District" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "District" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "District" ADD CONSTRAINT "PK_3b21403f1d497f5985fdeb9388a" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."address" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "workingHours" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."workingHours" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "headManager" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."headManager" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "manager" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."manager" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "phones" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."phones" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "PK_9862f679340fb2388436a5ab3e4"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_33dfea5a324cc5647050839f65" ON "House" ("street") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a01f200a2fe4b173ba9196bf3" ON "House" ("number") `);
        await queryRunner.query(`ALTER TABLE "Review" ADD CONSTRAINT "FK_118c08b03cb591253272341c862" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "House" ADD CONSTRAINT "FK_2fec0d00522d718acdd108d8a19" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Location" ADD CONSTRAINT "FK_a549687e52584cb057a3403a004" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Location" DROP CONSTRAINT "FK_a549687e52584cb057a3403a004"`);
        await queryRunner.query(`ALTER TABLE "House" DROP CONSTRAINT "FK_2fec0d00522d718acdd108d8a19"`);
        await queryRunner.query(`ALTER TABLE "Review" DROP CONSTRAINT "FK_118c08b03cb591253272341c862"`);
        await queryRunner.query(`DROP INDEX "IDX_7a01f200a2fe4b173ba9196bf3"`);
        await queryRunner.query(`DROP INDEX "IDX_33dfea5a324cc5647050839f65"`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "createAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "PK_9862f679340fb2388436a5ab3e4"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."phones" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "phones" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."manager" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "manager" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."headManager" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "headManager" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."workingHours" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "workingHours" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."address" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" ALTER COLUMN "createAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "District"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "District" DROP CONSTRAINT "PK_3b21403f1d497f5985fdeb9388a"`);
        await queryRunner.query(`ALTER TABLE "District" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "District" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "District" ADD CONSTRAINT "PK_3b21403f1d497f5985fdeb9388a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "House" DROP COLUMN "districtId"`);
        await queryRunner.query(`ALTER TABLE "House" ADD "districtId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."documents" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "documents" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" ALTER COLUMN "createAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "House"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "House" DROP CONSTRAINT "PK_de6499312c70e9a668019a4c7aa"`);
        await queryRunner.query(`ALTER TABLE "House" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "House" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "House" ADD CONSTRAINT "PK_de6499312c70e9a668019a4c7aa" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "houseId"`);
        await queryRunner.query(`ALTER TABLE "Review" ADD "houseId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Review" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "Review"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Review" ALTER COLUMN "createAt" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "Review"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Review" DROP CONSTRAINT "PK_4af5ddfa8a65e5571d851e4b752"`);
        await queryRunner.query(`ALTER TABLE "Review" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Review" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Review" ADD CONSTRAINT "PK_4af5ddfa8a65e5571d851e4b752" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "Review" ADD CONSTRAINT "FK_118c08b03cb591253272341c862" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "Location"`);
        await queryRunner.query(`DROP TABLE "Region"`);
        await queryRunner.query(`CREATE INDEX "HousesIndex" ON "House" ("street", "number") `);
    }

}
