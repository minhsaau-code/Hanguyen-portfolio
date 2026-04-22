import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '../lib/utils';

interface HLSVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  flipped?: boolean;
}

export const HLSVideo = ({ src, className, overlayClassName, flipped }: HLSVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover",
          flipped && "scale-y-[-1]"
        )}
        autoPlay
        muted
        loop
        playsInline
      />
      {overlayClassName && <div className={cn("absolute inset-0", overlayClassName)} />}
    </div>
  );
};
