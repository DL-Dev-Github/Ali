import React, { ReactNode } from 'react';
import './VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  children: ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc, children }) => {
  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline className="video">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="content">{children}</div>
    </div>
  );
};

export default VideoBackground;
