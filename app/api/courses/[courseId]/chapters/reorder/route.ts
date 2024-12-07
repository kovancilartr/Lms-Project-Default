import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const { courseId } = resolvedParams;

    const userId = (await auth()).userId;

    // console.log("User ID:", userId);
    // console.log("Course ID:", courseId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();
    // console.log("Received list:", list);

    if (!list || !Array.isArray(list)) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    const ownCourse = await prisma.course.findFirst({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.$transaction(
      list.map((item) =>
        prisma.chapter.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      )
    );

    return NextResponse.json({ message: "Başarılı 🎉" }, { status: 200 });
  } catch (error) {
    console.error("[REORDER COURSE] ERROR:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
