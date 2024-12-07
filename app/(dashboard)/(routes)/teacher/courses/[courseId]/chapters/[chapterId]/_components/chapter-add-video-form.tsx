"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import { Input } from "@/components/ui/input";;
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { VideoPlayerX } from "@/components/video-player-x";

interface ChapterAddVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterAddVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAddVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData.videoUrl,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const { videoUrl } = form.watch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      toast({
        title: "Chapter add video successfully",
        description: "You can now add lessons to your course",
        variant: "success",
      });
      toggleEdit();
      console.log(data);
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
      form.reset();
    }
  };
  return (
    <div className="border bg-slate-100 dark:bg-darkBgColor800 p-4 rounded-md mb-2">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className="dark:hover:bg-darkBgColor700"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <AspectRatio ratio={16 / 9}>
          <VideoPlayerX
            provider="youtube"
            videoUrl={videoUrl}
            options={{
              autoplay: true,
              controls: [
                "play-large", // The large play button in the center
                "restart", // Restart playback
                "rewind", // Rewind by the seek time (default 10 seconds)
                "play", // Play/pause playback
                "fast-forward", // Fast forward by the seek time (default 10 seconds)
                "progress", // The progress bar and scrubber for playback and buffering
                "current-time", // The current time of playback
                "duration", // The full duration of the media
                "mute", // Toggle mute
                "volume", // Volume control
                "captions", // Toggle captions
                "settings", // Settings menu
                "pip", // Picture-in-picture (currently Safari only)
                "airplay", // Airplay (currently Safari only)
                "download", // Show a download button with a link to either the current source or a custom URL you specify in your options
                "fullscreen", // Toggle fullscreen
              ],
              speed: {
                selected: 1,
                options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4],
              },
              storage: {
                enabled: true,
                key: "plyrKovancilar",
              },
              disableContextMenu: true,
              youtube: {
                playerVars: {
                  controls: 0,
                  fs: 0,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              },
            }}
          />
        </AspectRatio>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Add Youtube video URL"
                      className="dark:bg-darkBgColor700 dark:text-darkTextColor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-1/3 dark:bg-darkBgColor700 dark:text-darkTextColor"
              >
                Kaydet
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
