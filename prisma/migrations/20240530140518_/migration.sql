-- DropForeignKey
ALTER TABLE "followers" DROP CONSTRAINT "followers_followerId_fkey";

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
