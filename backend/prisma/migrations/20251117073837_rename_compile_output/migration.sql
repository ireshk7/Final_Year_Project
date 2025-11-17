/*
  Warnings:

  - You are about to drop the column `comileOutout` on the `TestCaseResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."TestCaseResult" DROP COLUMN "comileOutout",
ADD COLUMN     "compileOutput" TEXT;
