/*
  Warnings:

  - Added the required column `email` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "email" TEXT NOT NULL;
