"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { userRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackUrl: string;
  courseId: string;
  chapterId: string;
  title: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

export const VideoPlayer = ({
  playbackUrl,
  courseId,
  chapterId,
  title,
  nextChapterId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  // console.log ("isLocked", isLocked);
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />2
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            Bu bölümü izleyemezsiniz. Lütfen satın alınız.
          </p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackUrl}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => {
            setIsReady(true);
          }}
          onEnded={() => {}}
          autoPlay
        />
      )}
    </div>
  );
};
