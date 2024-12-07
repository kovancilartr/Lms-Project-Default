import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await prisma.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium italic cursor-help">Tüm Kurslar</h2>
      </div>
      <div className="p-4 shadow-lg m-4 border-2 rounded-md">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
