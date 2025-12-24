import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface HTML5PlayerProps {
  src: string;
  isMuted: boolean;
  onLoadedData?: () => void;
  onError?: (error: Error) => void;
}

export interface HTML5PlayerRef {
  play: () => Promise<void>;
  pause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seek: (time: number) => void;
  getVideoElement: () => HTMLVideoElement | null;
}

export const HTML5Player = forwardRef<HTML5PlayerRef, HTML5PlayerProps>(
  ({ src, isMuted, onLoadedData, onError }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose control methods to parent
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          try {
            await videoRef.current.play();
          } catch (err) {
            onError?.(err as Error);
          }
        }
      },
      pause: () => {
        videoRef.current?.pause();
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
      seek: (time: number) => {
        const video = videoRef.current;
        if (!video) return;

        const wasPlaying = !video.paused;

        // Pause, seek, play
        video.pause();
        video.currentTime = time;

        if (wasPlaying) {
          video.play().catch(() => {});
        }
      },
      getVideoElement: () => videoRef.current
    }));

    // Update muted state when prop changes
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
      }
    }, [isMuted]);

    // Auto-play when loaded
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedData = () => {
        onLoadedData?.();
        // Attempt autoplay
        video.play().catch(err => {
          console.warn('Autoplay prevented:', err);
        });
      };

      const handleError = () => {
        const error = video.error;
        let message = 'Video failed to load';

        if (error) {
          switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              message = 'Video loading aborted';
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              message = 'Network error loading video';
              break;
            case MediaError.MEDIA_ERR_DECODE:
              message = 'Video decoding error';
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              message = 'Video format not supported';
              break;
          }
        }

        onError?.(new Error(message));
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }, [onLoadedData, onError]);

    return (
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-contain"
        autoPlay
        playsInline
        loop
        muted={isMuted}
        preload="auto"
        style={{ backgroundColor: 'transparent' }}
      />
    );
  }
);

HTML5Player.displayName = 'HTML5Player';
