/*
  Warnings:

  - Changed the type of `superpowers` on the `Superhero` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Superhero" DROP COLUMN "superpowers",
ADD COLUMN     "superpowers" JSONB NOT NULL;
