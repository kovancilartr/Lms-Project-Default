import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { ValidMiddlewareObject } from "uploadthing/internal/types";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async (): Promise<ValidMiddlewareObject> => {
  const { userId } = await auth();
  const isAuthorized = isTeacher(userId);

  if (!userId || !isAuthorized) throw new Error("Not authenticated");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseChapter: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
