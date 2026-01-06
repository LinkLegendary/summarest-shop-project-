-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "interval" TEXT,
ADD COLUMN     "productName" TEXT,
ADD COLUMN     "unitAmount" INTEGER;
