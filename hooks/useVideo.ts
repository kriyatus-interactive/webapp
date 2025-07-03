import { useRef, useState, MouseEvent, useEffect } from "react";
import { formatDuration } from "@/utils/formatter";

interface UseVideoReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  timeLineRef: React.RefObject<HTMLDivElement | null>;
  previewRef: React.RefObject<HTMLDivElement | null>;
  previewTimestamp: string;
  playVideo: () => void;
  handleTimeLineProgress: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleClickSeek: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseSeek: (e: MouseEvent<HTMLDivElement>) => void;
  handleTimeLinePreview: (e: MouseEvent<HTMLDivElement>) => void;
}

const useVideo = (): UseVideoReturn => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeLineRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [previewTimestamp, setPreviewTimestamp] = useState<string>("0:00");

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (video.paused) video.play();
      else video.pause();
    } catch (err) {
      console.error(`Error playing video:`, err);
      alert("An error occurred while playing the video");
    }
  };

  const handleTimeLineProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = videoRef.current;
    const timeline = timeLineRef.current;
    if (!video || !timeline || !video.duration) return;
    const progress = video.currentTime / video.duration;
    timeline.style.setProperty("--progress-position", progress.toString());
  };

  const handleClickSeek = (e: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const timeline = timeLineRef.current;
    if (!video || !timeline || !video.duration) return;
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    video.currentTime = (clickX / rect.width) * video.duration;
  };

  const handleMouseSeek = (e: MouseEvent<HTMLDivElement>) => {
    const timeline = timeLineRef.current;
    if (!timeline) return;
    timeline.style.setProperty("--preview-position", "0");
    handleClickSeek(e);
  };

  const handleTimeLinePreview = (e: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const timeline = timeLineRef.current;
    const preview = previewRef.current;
    if (!video || !timeline || !preview || !video.duration) return;

    const rect = timeline.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.x), rect.width);
    const percent = x / rect.width;
    const newTime = percent * video.duration;

    setPreviewTimestamp(formatDuration(newTime));

    const pos = Math.min(Math.max(percent, 0.08), 0.92);
    preview.style.setProperty("--preview-container-position", pos.toString());
    timeline.style.setProperty("--preview-position", percent.toString());
  };

  return {
    videoRef,
    timeLineRef,
    previewRef,
    previewTimestamp,
    playVideo,
    handleTimeLineProgress,
    handleClickSeek,
    handleMouseSeek,
    handleTimeLinePreview,
  };
};

export default useVideo;
