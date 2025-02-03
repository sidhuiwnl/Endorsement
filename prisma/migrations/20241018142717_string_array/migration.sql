/*
  Warnings:

  - The `images` column on the `TweetReview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TweetReview" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];
