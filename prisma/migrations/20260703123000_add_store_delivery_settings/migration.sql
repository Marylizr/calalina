ALTER TABLE "StoreSettings"
ADD COLUMN "deliveryEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "deliveryPostalCodes" TEXT,
ADD COLUMN "deliveryFee" DECIMAL(10, 2),
ADD COLUMN "deliveryMinimumOrder" DECIMAL(10, 2),
ADD COLUMN "deliveryMessageCa" TEXT,
ADD COLUMN "deliveryMessageEs" TEXT,
ADD COLUMN "deliveryMessageEn" TEXT;
