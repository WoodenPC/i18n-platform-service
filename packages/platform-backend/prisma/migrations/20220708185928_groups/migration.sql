/*
  Warnings:

  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "_UserToUsersGroup" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUsersGroup_AB_unique" ON "_UserToUsersGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUsersGroup_B_index" ON "_UserToUsersGroup"("B");

-- AddForeignKey
ALTER TABLE "_UserToUsersGroup" ADD CONSTRAINT "_UserToUsersGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUsersGroup" ADD CONSTRAINT "_UserToUsersGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "UsersGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
