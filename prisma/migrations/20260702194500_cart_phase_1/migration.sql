-- Product availability and cart/order phase 1 support.
ALTER TYPE "ProductUnit" ADD VALUE IF NOT EXISTS 'bottle';

ALTER TABLE "Product"
ADD COLUMN "availableOnline" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "OrderItem"
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
