ALTER TABLE "Order"
ADD COLUMN "deliveryAddress" TEXT,
ADD COLUMN "deliveryAddressExtra" TEXT,
ADD COLUMN "deliveryPostalCode" TEXT,
ADD COLUMN "deliveryInstructions" TEXT,
ADD COLUMN "deliveryFee" DECIMAL(10, 2);
