import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { VideoPlayerX } from "@/components/video-player-x";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";
// import { VideoPlayer } from "./_components/video-player";

const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const userId = (await auth()).userId;

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  console.log("Chapter", chapter);
  console.log("Course", course);
  console.log("Mux Data", muxData);
  console.log("Attachments", attachments);
  console.log("Next Chapter", nextChapter);
  console.log("User Progress", userProgress);
  console.log("Purchase", purchase);

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch chapter"
        />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {/* Video Player Youtube */}
          {/* <VideoPlayerYoutube videoUrl={chapter?.videoUrl} /> */}
          <VideoPlayerX
            provider="youtube"
            videoUrl={chapter?.videoUrl}
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackUrl={muxData?.playbackId}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />

          {/* Video Player Mux */}
          {/* <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackUrl={muxData?.playbackId}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          /> */}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div>
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4 space-y-2">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="h-6 w-6 mr-2 flex-shrink-0" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
