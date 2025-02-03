-- DropIndex
DROP INDEX "tweetreview_handle_key";

-- AlterTable
ALTER TABLE "tweetreview" ALTER COLUMN "handle" DROP NOT NULL;
