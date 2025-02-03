/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `TweetReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_tweetName_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_userId_fkey";

-- AlterTable
ALTER TABLE "TweetReview" ADD COLUMN     "images" TEXT NOT NULL;

-- DropTable
DROP TABLE "Images";
