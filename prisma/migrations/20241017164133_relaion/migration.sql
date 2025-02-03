/*
  Warnings:

  - Added the required column `tweetId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "tweetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "TweetReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
