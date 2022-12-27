/*
  Warnings:

  - Added the required column `postedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "postTitle" TEXT NOT NULL,
    "postContent" TEXT NOT NULL,
    "postImage" TEXT NOT NULL,
    "postedAt" TEXT NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("id", "postContent", "postImage", "postTitle", "userId") SELECT "id", "postContent", "postImage", "postTitle", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_userId_key" ON "Post"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
