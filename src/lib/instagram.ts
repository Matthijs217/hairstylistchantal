export interface InstaFoto {
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
  caption?: string;
  permalink: string;
}

interface BeholdPost {
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
  caption?: string;
  permalink: string;
}

export async function fetchInstagramFotos(): Promise<InstaFoto[]> {
  const feedId = import.meta.env.BEHOLD_FEED_ID;
  if (!feedId) return [];

  try {
    const res = await fetch(
      `https://feeds.behold.so/${feedId}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const posts: BeholdPost[] = await res.json();
    return posts
      .filter((p) => p.mediaType === 'IMAGE' || p.mediaType === 'CAROUSEL_ALBUM')
      .map((p) => ({
        media_url: p.mediaUrl,
        media_type: p.mediaType,
        timestamp: p.timestamp,
        caption: p.caption,
        permalink: p.permalink,
      }));
  } catch {
    return [];
  }
}

export function instaAlt(caption?: string): string {
  if (!caption) return 'Hairstylist Chantal op Instagram';
  const firstLine = caption.split('\n')[0].replace(/#\S+/g, '').trim();
  return firstLine.slice(0, 100) || 'Hairstylist Chantal op Instagram';
}
