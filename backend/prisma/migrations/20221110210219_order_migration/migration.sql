/*
  Warnings:

  - You are about to drop the `Oders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Oders" DROP CONSTRAINT "Oders_ListId_fkey";

-- DropForeignKey
ALTER TABLE "Oders" DROP CONSTRAINT "Oders_userId_fkey";

-- DropTable
DROP TABLE "Oders";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "nameId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orders_userId_nameId_key" ON "Orders"("userId", "nameId");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "ListOfNames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
