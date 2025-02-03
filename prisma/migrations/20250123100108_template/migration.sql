-- CreateTable
CREATE TABLE "Templates" (
    "id" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "sendersName" TEXT NOT NULL,
    "replyToEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "placeholders" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
