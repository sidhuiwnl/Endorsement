/*
  Warnings:

  - You are about to drop the column `tweetId` on the `Images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[handle]` on the table `TweetReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tweetName` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_tweetId_fkey";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "tweetId",
ADD COLUMN     "tweetName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TweetReview_handle_key" ON "TweetReview"("handle");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_tweetName_fkey" FOREIGN KEY ("tweetName") REFERENCES "TweetReview"("handle") ON DELETE CASCADE ON UPDATE CASCADE;
