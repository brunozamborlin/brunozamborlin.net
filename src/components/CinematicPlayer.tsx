import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { getVideoInfo } from "@/lib/videoUtils";
import { HTML5Player, type HTML5PlayerRef } from "./HTML5Player";
import { YouTubePlayer } from "./YouTubePlayer";

interface CinematicPlayerProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  startMuted?: boolean;
}

export default function CinematicPlayer({ videoUrl, title, isOpen, startMuted = false }: CinematicPlayerProps) {
  const [isMuted, setIsMuted] = useState(startMuted);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // New state for HTML5 player
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const html5PlayerRef = useRef<HTML5PlayerRef>(null);

  const videoInfo = getVideoInfo(videoUrl);
  const isLocalVideo = videoInfo.type === 'local';

  const hideControlsWithDelay = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    hideControlsWithDelay();
  }, [hideControlsWithDelay]);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
      setIsMuted(startMuted); // Reset muted state when dialog opens
      const timer = setTimeout(() => setIsLoaded(true), 100);
      hideControlsWithDelay();
      return () => clearTimeout(timer);
    }
  }, [isOpen, hideControlsWithDelay, startMuted]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // HTML5 video progress tracking
  useEffect(() => {
    if (!isLocalVideo || !isOpen) return;

    const video = html5PlayerRef.current?.getVideoElement();
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [isLocalVideo, isOpen]);

  // Progress bar click handler
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLocalVideo || !html5PlayerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    html5PlayerRef.current.seek(newTime);
  }, [isLocalVideo, duration]);

  // Render conditional player
  const renderPlayer = () => {
    if (videoInfo.type === 'local') {
      return (
        <HTML5Player
          ref={html5PlayerRef}
          src={videoInfo.source}
          isMuted={isMuted}
          onLoadedData={() => setIsLoaded(true)}
          onError={(err) => console.error('Video error:', err)}
        />
      );
    } else {
      return (
        <YouTubePlayer
          videoId={videoInfo.source}
          isMuted={isMuted}
          onReady={() => setIsLoaded(true)}
        />
      );
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      onMouseEnter={() => setShowControls(true)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            {isOpen && renderPlayer()}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 z-30"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            
            <div className="relative px-6 pb-6 pt-16">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                className="mb-4"
              >
                <div
                  className="py-3 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                  {isLocalVideo ? (
                    // Real progress for local videos
                    <div
                      className="h-full bg-gradient-to-r from-white/60 via-white to-white/60 transition-all duration-150"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  ) : (
                    // Shimmer animation for YouTube (no API access)
                    <motion.div
                      className="h-full bg-gradient-to-r from-white/60 via-white to-white/60"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ width: "30%" }}
                    />
                  )}
                  </div>
                </div>
              </motion.div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </motion.button>
                  
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isMuted ? "muted" : "unmuted"}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-[10px] uppercase tracking-widest text-white/50 font-mono"
                    >
                      {isMuted ? "Sound Off" : "Sound On"}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <span className="text-xs text-white/40 uppercase tracking-[0.3em] font-light">
                    {title}
                  </span>
                </motion.div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black z-40 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.3) 2px,
              rgba(0,0,0,0.3) 4px
            )`
          }}
        />
      </div>
    </div>
  );
}
