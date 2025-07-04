"use client";

import React, { useState } from "react";
import { Heart, MessageSquareText, Share2, Volume2, VolumeOff } from "lucide-react"; // icons

interface ReelPlayerProps {
  reel_id: string;
  videoUrl: string;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({ reel_id, videoUrl }) => {
  const [muted, setMuted] = useState(true);

  const handleClick = () => {
    window.alert('Install the Kriyatus App to interact with video');
  }

  return (
    <div key={reel_id} className="h-screen sm:h-auto sm:max-w-sm aspect-[9/16] relative sm:rounded-md overflow-hidden">
        <video className="bottom-0 top-0 left-0 right-0" src={videoUrl} autoPlay loop muted={muted}></video>

        {/* Mute button */}
        <button
         onClick={() => setMuted(m => !m)}
          className={`absolute top-8 right-4 flex flex-col items-center transform -translate-y-1/2 text-white`}
        >
          {muted ? <VolumeOff size={24} /> : <Volume2 size={24} />}
        </button>

        {/* Like button */}
        <button
        onClick={handleClick}
          className={`absolute bottom-52 right-4 flex flex-col items-center transform -translate-y-1/2 text-gray-400`}
        >
          <Heart size={24} />
          <span className="mt-1 text-sm">
            0
          </span>
        </button>

        {/* Comment button */}
        <button
        onClick={handleClick}
          className={`absolute bottom-32 right-4 flex flex-col items-center transform -translate-y-1/2 text-gray-400`}
        >
          <MessageSquareText size={24} />
          <span className="mt-1 text-sm">
            45
          </span>
        </button>

        {/* Share button */}
        <button
         onClick={handleClick}
          className={`absolute bottom-24 right-4 flex flex-col items-center transform -translate-y-1/2 text-gray-400`}
        >
          <Share2 size={24} />
        </button>

        {/* Avatar & username placeholders */}
        <div className="absolute bottom-10 left-4 flex items-center gap-2 text-white">
          <div className="w-10 h-10 bg-gray-600 rounded-full" />
          <p className="font-semibold text-sm">@username</p>
        </div>
    </div>
  );
};

export default ReelPlayer;
