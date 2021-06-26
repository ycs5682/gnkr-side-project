import {MigrationInterface, QueryRunner} from "typeorm";

export class createMigrations1624666976090 implements MigrationInterface {
    name = 'createMigrations1624666976090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4"`);
        await queryRunner.query(`DROP INDEX "IDX_ef748b9274d29d4b39236e72c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_feed_tags_tag" ("feedId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_ef748b9274d29d4b39236e72c52" FOREIGN KEY ("feedId") REFERENCES "feed" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("feedId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "temporary_feed_tags_tag"("feedId", "tagId") SELECT "feedId", "tagId" FROM "feed_tags_tag"`);
        await queryRunner.query(`DROP TABLE "feed_tags_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_feed_tags_tag" RENAME TO "feed_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4" ON "feed_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef748b9274d29d4b39236e72c5" ON "feed_tags_tag" ("feedId") `);
        await queryRunner.query(`DROP INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4"`);
        await queryRunner.query(`DROP INDEX "IDX_ef748b9274d29d4b39236e72c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_feed_tags_tag" ("feedId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_ef748b9274d29d4b39236e72c52" FOREIGN KEY ("feedId") REFERENCES "feed" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d8cb6aed2b9c353b4829fa3ab4e" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("feedId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "temporary_feed_tags_tag"("feedId", "tagId") SELECT "feedId", "tagId" FROM "feed_tags_tag"`);
        await queryRunner.query(`DROP TABLE "feed_tags_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_feed_tags_tag" RENAME TO "feed_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4" ON "feed_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef748b9274d29d4b39236e72c5" ON "feed_tags_tag" ("feedId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_ef748b9274d29d4b39236e72c5"`);
        await queryRunner.query(`DROP INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4"`);
        await queryRunner.query(`ALTER TABLE "feed_tags_tag" RENAME TO "temporary_feed_tags_tag"`);
        await queryRunner.query(`CREATE TABLE "feed_tags_tag" ("feedId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_ef748b9274d29d4b39236e72c52" FOREIGN KEY ("feedId") REFERENCES "feed" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("feedId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "feed_tags_tag"("feedId", "tagId") SELECT "feedId", "tagId" FROM "temporary_feed_tags_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_feed_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_ef748b9274d29d4b39236e72c5" ON "feed_tags_tag" ("feedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4" ON "feed_tags_tag" ("tagId") `);
        await queryRunner.query(`DROP INDEX "IDX_ef748b9274d29d4b39236e72c5"`);
        await queryRunner.query(`DROP INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4"`);
        await queryRunner.query(`ALTER TABLE "feed_tags_tag" RENAME TO "temporary_feed_tags_tag"`);
        await queryRunner.query(`CREATE TABLE "feed_tags_tag" ("feedId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_d8cb6aed2b9c353b4829fa3ab4e" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ef748b9274d29d4b39236e72c52" FOREIGN KEY ("feedId") REFERENCES "feed" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("feedId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "feed_tags_tag"("feedId", "tagId") SELECT "feedId", "tagId" FROM "temporary_feed_tags_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_feed_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_ef748b9274d29d4b39236e72c5" ON "feed_tags_tag" ("feedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8cb6aed2b9c353b4829fa3ab4" ON "feed_tags_tag" ("tagId") `);
    }

}
