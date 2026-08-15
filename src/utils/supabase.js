import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://aakbfxytplebguhglnjo.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_ZumlhXVv7HYYOLan8U8d4A_wY0botDx';
export const BUCKET_NAME = 'photobooth';
export const TABLE_NAME = 'photobooth_sessions';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Uploads a Blob directly to Supabase Storage and records session details in the Database table.
 */
export async function uploadSessionFile(session, blob, filename, meta = {}) {
    try {
        const objectPath = `${session}/${filename}`;
        
        // 1. Determine clean content type for Supabase Storage
        let cleanContentType = 'application/octet-stream';
        if (filename.endsWith('.png')) cleanContentType = 'image/png';
        else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) cleanContentType = 'image/jpeg';
        else if (filename.endsWith('.mp4')) cleanContentType = 'video/mp4';
        else if (filename.endsWith('.webm')) cleanContentType = 'video/webm';

        // 2. Upload to Supabase Storage
        const { data: storageData, error: storageError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(objectPath, blob, {
                upsert: true,
                contentType: cleanContentType,
            });

        if (storageError) {
            console.error('⚠️ Supabase storage error:', storageError.message);
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(objectPath);

        const publicUrl = publicUrlData?.publicUrl || `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${objectPath}`;

        // 2. Insert or update session record in Database
        const isPhoto = filename.endsWith('.png') || filename.endsWith('.jpg');
        const isVideo = filename.endsWith('.mp4') || filename.endsWith('.webm');
        const frameTheme = meta.frame || 'climate';
        const photoFilter = meta.filter || 'normal';

        // 3. Convert photo blob to base64 preview as instant database fallback
        let photoBase64 = null;
        if (isPhoto && blob.size < 3000000) {
            photoBase64 = await new Promise((res) => {
                const reader = new FileReader();
                reader.onloadend = () => res(reader.result);
                reader.onerror = () => res(null);
                reader.readAsDataURL(blob);
            });
        }

        const row = {
            session_code: session,
            frame_theme: frameTheme,
            photo_filter: photoFilter,
            ...(isPhoto ? { photo_filename: filename, photo_url: publicUrl } : {}),
            ...(isVideo ? { video_filename: filename, video_url: publicUrl } : {}),
            meta: {
                frame_template: frameTheme,
                photo_filter: photoFilter,
                ...(photoBase64 ? { photo_data: photoBase64 } : {}),
                updated_at: new Date().toISOString(),
                client_url: window.location.origin,
            },
        };

        let { error: dbError } = await supabase
            .from(TABLE_NAME)
            .upsert(row, { onConflict: 'session_code' });

        // If the table doesn't have newer columns like photo_filter or frame_theme, retry with base columns
        if (dbError && dbError.message && (dbError.message.includes('column') || dbError.code === 'PGRST204')) {
            console.warn('Retrying database save with minimal columns...', dbError.message);
            const baseRow = {
                session_code: session,
                ...(isPhoto ? { photo_filename: filename, photo_url: publicUrl } : {}),
                ...(isVideo ? { video_filename: filename, video_url: publicUrl } : {}),
                meta: {
                    frame_template: frameTheme,
                    photo_filter: photoFilter,
                    ...(photoBase64 ? { photo_data: photoBase64 } : {}),
                    updated_at: new Date().toISOString(),
                    client_url: window.location.origin,
                },
            };
            const { error: retryError } = await supabase
                .from(TABLE_NAME)
                .upsert(baseRow, { onConflict: 'session_code' });
            if (retryError) {
                console.warn('Supabase database fallback notice:', retryError.message);
            }
        } else if (dbError) {
            console.warn('Supabase database notice:', dbError.message);
        }

        return { publicUrl, session, storageError: storageError?.message };
    } catch (err) {
        console.error('Supabase upload error:', err);
        return { error: err.message };
    }
}

/**
 * Fetches session record from Supabase database for mobile download page.
 */
export async function fetchSessionRecord(session) {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('session_code', session)
            .maybeSingle();

        if (error) throw error;
        return data;
    } catch (err) {
        console.warn('Fetch session error:', err);
        return null;
    }
}

