interface YouTubePlayerProps {
  videoId: string;
  isMuted: boolean;
  onReady?: () => void;
}

export function YouTubePlayer({ videoId, isMuted, onReady }: YouTubePlayerProps) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=0&showinfo=0&iv_load_policy=3&mute=${isMuted ? 1 : 0}&enablejsapi=1&loop=1&playlist=${videoId}`;

  return (
    <iframe
      src={embedUrl}
      className="absolute inset-0 w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      onLoad={onReady}
      title={`YouTube video ${videoId}`}
    />
  );
}
