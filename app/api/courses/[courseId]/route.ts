import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Mevcut Kursu Günceller
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userId = (await auth()).userId;
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
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
    const { courseId } = resolvedParams;

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

    const deletedCourse = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.error("[COURSE_ID_DELETE] ERROR:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
