import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Yeni Kurs Oluştur
export async function POST(req: Request) {
  try {
    const userId = (await auth()).userId;
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[CREATE_COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
      take: 10,
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.log("[GET_ALL_COURSES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
