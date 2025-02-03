/*
  Warnings:

  - You are about to drop the `Templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TweetReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_userId_fkey";

-- DropForeignKey
ALTER TABLE "TweetReview" DROP CONSTRAINT "TweetReview_userId_fkey";

-- DropTable
DROP TABLE "Templates";

-- DropTable
DROP TABLE "TweetReview";

-- CreateTable
CREATE TABLE "tweetreview" (
    "id" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "tweetContent" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "tweetreview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "templateName" TEXT NOT NULL DEFAULT 'Untitled',
    "sendersName" TEXT NOT NULL,
    "replyToEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "placeholders" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tweetreview_handle_key" ON "tweetreview"("handle");

-- AddForeignKey
ALTER TABLE "tweetreview" ADD CONSTRAINT "tweetreview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
