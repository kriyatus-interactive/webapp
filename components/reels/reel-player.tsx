"use client";

import React, { useState, useRef } from "react";
import {
  Heart,
  MessageSquareText,
  Share2,
  Volume2,
  VolumeOff,
} from "lucide-react";

interface ReelPlayerProps {
  reel_id: string;
  videoUrl: string;
  userAvatar: string;
  userName: string;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({
  reel_id,
  videoUrl,
  userAvatar,
  userName,
}) => {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoEl = useRef<HTMLVideoElement>(null);

  const handleClickAction = () => {
    window.alert("Install the Kriyatus App to interact with video");
  };

  const togglePlayPause = () => {
    const video = videoEl.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div key={reel_id} className="flex justify-center items-center">
      {/* container as before */}
      <div
        className="relative bg-black
                      w-screen h-screen
                      sm:aspect-[9/16] sm:max-h-screen sm:max-w-[450px]"
        onClick={togglePlayPause}
      >
        <video
          ref={videoEl}
          src={videoUrl}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* mute button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
          className="absolute top-6 right-4 z-20 p-2 bg-black bg-opacity-50 rounded-full text-white"
        >
          {muted ? <VolumeOff size={24} /> : <Volume2 size={24} />}
        </button>

        {/* action icons */}
        <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6 z-20 text-white">
          <button onClick={(e) => { e.stopPropagation(); handleClickAction(); }} className="flex flex-col items-center">
            <Heart size={32} /><span className="text-xs mt-1">Like</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleClickAction(); }} className="flex flex-col items-center">
            <MessageSquareText size={32} /><span className="text-xs mt-1">Comment</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleClickAction(); }} className="flex flex-col items-center">
            <Share2 size={32} /><span className="text-xs mt-1">Share</span>
          </button>
        </div>

        {/* user info */}
        <div className="absolute bottom-6 left-4 z-20 flex items-center space-x-3 text-white">
          <picture>
            <img
              src={userAvatar}
              alt={`${userName} avatar`}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
          </picture>
          <p className="font-semibold text-base">@{userName}</p>
        </div>

        {/* Optional overlay icon to show play/pause state */}
        {!isPlaying && (
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <div className="bg-black bg-opacity-50 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelPlayer;
