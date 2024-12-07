import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const userId = (await auth()).userId;
    const resolvedParams = await context.params;
    const { courseId, chapterId } = resolvedParams;
    const { ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    // TODO: Handle Video Upload

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_CHAPTER_ID] ERROR:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const userId = (await auth()).userId;
    const resolvedParams = await context.params;
    const { courseId, chapterId } = resolvedParams;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const chapter = await prisma.chapter.delete({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[CHAPTER_ID_DELETE] ERROR:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
