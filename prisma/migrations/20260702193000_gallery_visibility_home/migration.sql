-- Add editable public visibility controls for gallery images.
ALTER TABLE "GalleryImage"
ADD COLUMN "isVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showOnHome" BOOLEAN NOT NULL DEFAULT true;

-- Make image paths unique so seed can safely upsert by image URL/path.
CREATE UNIQUE INDEX "GalleryImage_image_key" ON "GalleryImage"("image");
