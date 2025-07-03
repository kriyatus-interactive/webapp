"use client";

import React, { useState } from "react";
import { Heart, MessageSquareText, Share2, Volume2, VolumeOff } from "lucide-react"; // icons

interface ReelPlayerProps {
  reel_id: string;
  videoUrl: string;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({ reel_id, videoUrl }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [muted, setMuted] = useState(true);

  const handleClick = () => {
    window.alert('Install the Kriyatus App to interact with video');
  }

  return (
    <div key={reel_id} className="h-full sm:aspect-[9/16] relative overflow-hidden rounded-sm">
        <video className="" src={videoUrl} autoPlay loop muted={muted}></video>

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
          className={`absolute bottom-52 right-4 flex flex-col items-center transform -translate-y-1/2 text-white`}
        >
          <Heart size={24} />
          <span className="mt-1 text-sm">
            {likeCount < 1000 ? likeCount : `${(likeCount / 1000).toFixed(1)}k`}
          </span>
        </button>

        {/* Comment button */}
        <button
        onClick={handleClick}
          className={`absolute bottom-32 right-4 flex flex-col items-center transform -translate-y-1/2 text-white`}
        >
          <MessageSquareText size={24} />
          <span className="mt-1 text-sm">
            45
          </span>
        </button>

        {/* Share button */}
        <button
         onClick={handleClick}
          className={`absolute bottom-24 right-4 flex flex-col items-center transform -translate-y-1/2 text-white`}
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
