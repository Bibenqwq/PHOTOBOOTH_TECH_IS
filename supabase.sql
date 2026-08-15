-- ============================================================================
-- SDG 13 PHOTO BOOTH — COMPLETE SUPABASE DATABASE & STORAGE SCHEMA
-- Project: aakbfxytplebguhglnjo
-- Dashboard URL: https://supabase.com/dashboard/project/aakbfxytplebguhglnjo/sql
-- ============================================================================

-- 1. Create the Photobooth Sessions Table
CREATE TABLE IF NOT EXISTS public.photobooth_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    frame_theme TEXT DEFAULT 'climate',
    photo_filter TEXT DEFAULT 'normal',
    photo_filename TEXT,
    photo_url TEXT,
    video_filename TEXT,
    video_url TEXT,
    meta JSONB DEFAULT '{}'::jsonb
);

-- Ensure all columns exist kahit nagawa na dati ang table
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS frame_theme TEXT DEFAULT 'climate';
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS photo_filter TEXT DEFAULT 'normal';
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS photo_filename TEXT;
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS video_filename TEXT;
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.photobooth_sessions ADD COLUMN IF NOT EXISTS meta JSONB DEFAULT '{}'::jsonb;

-- Indexes for fast session lookups
CREATE INDEX IF NOT EXISTS idx_photobooth_session_code 
    ON public.photobooth_sessions(session_code);

CREATE INDEX IF NOT EXISTS idx_photobooth_created_at 
    ON public.photobooth_sessions(created_at DESC);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.photobooth_sessions ENABLE ROW LEVEL SECURITY;

-- Database Policies (Drop if exists para walang error kapag inulit i-run)
DROP POLICY IF EXISTS "Allow public read on photobooth_sessions" ON public.photobooth_sessions;
CREATE POLICY "Allow public read on photobooth_sessions"
    ON public.photobooth_sessions
    FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Allow public insert on photobooth_sessions" ON public.photobooth_sessions;
CREATE POLICY "Allow public insert on photobooth_sessions"
    ON public.photobooth_sessions
    FOR INSERT
    TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on photobooth_sessions" ON public.photobooth_sessions;
CREATE POLICY "Allow public update on photobooth_sessions"
    ON public.photobooth_sessions
    FOR UPDATE
    TO public
    USING (true);

-- ============================================================================
-- 3. Create Storage Bucket for Photos and Videos
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'photobooth',
    'photobooth',
    true,
    52428800, -- 50 MB limit
    NULL      -- Allow all image & video formats
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = NULL;

-- Storage Policies for 'photobooth' bucket
DROP POLICY IF EXISTS "Allow public download from photobooth bucket" ON storage.objects;
CREATE POLICY "Allow public download from photobooth bucket"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'photobooth');

DROP POLICY IF EXISTS "Allow public upload to photobooth bucket" ON storage.objects;
CREATE POLICY "Allow public upload to photobooth bucket"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'photobooth');

DROP POLICY IF EXISTS "Allow public update in photobooth bucket" ON storage.objects;
CREATE POLICY "Allow public update in photobooth bucket"
    ON storage.objects
    FOR UPDATE
    TO public
    USING (bucket_id = 'photobooth');

-- 4. Reload Schema Cache
NOTIFY pgrst, 'reload schema';
