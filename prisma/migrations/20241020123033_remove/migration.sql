/*
  Warnings:

  - You are about to drop the column `github_id` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_github_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "github_id";
