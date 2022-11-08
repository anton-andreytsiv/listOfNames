-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOfNames" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ListOfNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "ListId" INTEGER NOT NULL,

    CONSTRAINT "Oders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- AddForeignKey
ALTER TABLE "Oders" ADD CONSTRAINT "Oders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oders" ADD CONSTRAINT "Oders_ListId_fkey" FOREIGN KEY ("ListId") REFERENCES "ListOfNames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
