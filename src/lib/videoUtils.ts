import { localVideos, type LocalVideoId } from './videoAssets';

export type VideoType = 'local' | 'youtube';

export interface VideoInfo {
  type: VideoType;
  source: string; // Either local asset URL or YouTube ID
}

export function getVideoInfo(url: string): VideoInfo {
  // Check for local video prefix
  if (url.startsWith('local:')) {
    const videoId = url.replace('local:', '') as LocalVideoId;

    if (videoId in localVideos) {
      return {
        type: 'local',
        source: localVideos[videoId]
      };
    }

    throw new Error(`Local video not found: ${videoId}`);
  }

  // Parse YouTube URL
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu.be\/)([^&]+)/);
    const youtubeId = match?.[1] || url.split('v=')[1]?.split('&')[0] || '';

    return {
      type: 'youtube',
      source: youtubeId
    };
  }

  throw new Error(`Invalid video URL format: ${url}`);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
