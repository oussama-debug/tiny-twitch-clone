/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "channelId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "channels_username_key" ON "channels"("username");

-- CreateIndex
CREATE UNIQUE INDEX "channels_userId_key" ON "channels"("userId");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
