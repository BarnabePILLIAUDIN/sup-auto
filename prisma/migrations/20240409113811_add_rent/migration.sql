/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "roles",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Rent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "carId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
