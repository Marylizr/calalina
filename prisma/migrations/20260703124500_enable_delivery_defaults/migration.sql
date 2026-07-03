ALTER TABLE "StoreSettings"
ALTER COLUMN "deliveryEnabled" SET DEFAULT true;

UPDATE "StoreSettings"
SET
  "deliveryEnabled" = true,
  "deliveryRequestEnabled" = true,
  "deliveryPostalCodes" = COALESCE("deliveryPostalCodes", '08025,08037,08013'),
  "deliveryFee" = COALESCE("deliveryFee", 3.50)
WHERE
  "deliveryEnabled" = false
  AND "deliveryPostalCodes" IS NULL
  AND "deliveryFee" IS NULL;
