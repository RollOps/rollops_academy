-- Create the site-assets public bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  52428800, -- 50MiB
  ARRAY[
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf'
  ]
);

-- Anyone can read (bucket is public)
CREATE POLICY "Public read access on site-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload to site-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-assets');

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete from site-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-assets');

-- Authenticated users can update (upsert)
CREATE POLICY "Authenticated users can update in site-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-assets');
