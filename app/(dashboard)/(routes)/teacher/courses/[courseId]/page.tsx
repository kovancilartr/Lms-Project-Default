import { IconBadge } from "@/components/icon-badge";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ChevronDownIcon,
  CircleDollarSign,
  File,
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Banner } from "@/components/banner";
import { CourseActions } from "./_components/course-actions";

const CourseIdPage = async (context: {
  params: Promise<{ courseId: string }>;
}) => {
  const { userId } = await auth();
  const resolvedParams = await context.params;
  const { courseId } = resolvedParams;

  if (!userId) {
    return redirect("/");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price || course.price === 0,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible to students"
        />
      )}
      <div className="p-4 h-full">
        <div className="flex flex-row justify-between items-center p-2 border shadow-lg rounded-lg dark:bg-darkBgColor800">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <div>
            <span className="text-sm text-slate-700 dark:text-darkTextColor">
              Complete all fields {completionText}
            </span>
          </div>
          {/* Add Actions */}
          <CourseActions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
        </div>

        <div className="space-y-6">
          {/* Course Info(Aşama 1) Bölümü */}
          <div className="space-y-2 my-4">
            <Collapsible defaultOpen={false}>
              <CollapsibleTrigger className="border p-2 mb-2 shadow-lg rounded-md w-full dark:bg-darkBgColor800">
                <div className="flex items-center gap-x-2 justify-between">
                  <div className="flex flex-row gap-x-2 items-center">
                    <IconBadge icon={ListChecks} />
                    <h2 className="text-xl">
                      Course Info{" "}
                      <span className="text-sm font-extralight">(Aşama 1)</span>
                    </h2>
                  </div>
                  <div className="flex flex-row items-center gap-x-1">
                    <span className="text-xs text-slate-700 dark:text-darkTextColor">
                      Küçült
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-slate-500 dark:text-darkTextColor" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TitleForm initialData={course} courseId={course.id} />
                  <DescriptionForm initialData={course} courseId={course.id} />
                  <ImageForm initialData={course} courseId={course.id} />
                  <div className="space-y-2">
                    <CategoryForm
                      initialData={course}
                      courseId={course.id}
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                    />

                    <PriceForm initialData={course} courseId={course.id} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Course Chapters(Aşama 2) Bölümü */}
          <div className="space-y-2 my-4">
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger className="border p-2 mb-2 shadow-lg rounded-md w-full dark:bg-darkBgColor800">
                <div className="flex items-center gap-x-2 justify-between">
                  <div className="flex flex-row gap-x-2 items-center">
                    <IconBadge icon={LayoutGrid} />
                    <h2 className="text-xl">
                      Course Chapters{" "}
                      <span className="text-sm font-extralight">(Aşama 2)</span>
                    </h2>
                  </div>
                  <div className="flex flex-row items-center gap-x-1">
                    <span className="text-xs text-slate-700 dark:text-darkTextColor">
                      Küçült
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-slate-500 dark:text-darkTextColor" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ChaptersForm initialData={course} courseId={course.id} />
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Buraya Başka Bir Bölüm Eklenecek */}
            <div className="space-y-2">
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className="border p-2 mb-2 shadow-lg rounded-md w-full dark:bg-darkBgColor800">
                  <div className="flex items-center gap-x-2 justify-between">
                    <div className="flex flex-row gap-x-2 items-center">
                      <IconBadge icon={CircleDollarSign} />
                      <h2 className="text-xl">
                        Sell your course{" "}
                        <span className="text-sm font-extralight">
                          (Aşama 3)
                        </span>
                      </h2>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                      <span className="text-xs text-slate-700 dark:text-darkTextColor">
                        Küçült
                      </span>
                      <ChevronDownIcon className="h-5 w-5 text-slate-500 dark:text-darkTextColor" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <PriceForm initialData={course} courseId={course.id} />
                </CollapsibleContent>
              </Collapsible>
            </div>
            {/* Buraya Başka Bir Bölüm Eklenecek */}

            <div className="space-y-2">
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className="border p-2 mb-2 shadow-lg rounded-md w-full dark:bg-darkBgColor800">
                  <div className="flex items-center gap-x-2 justify-between">
                    <div className="flex flex-row gap-x-2 items-center">
                      <IconBadge icon={File} />
                      <h2 className="text-xl">
                        Resources & Attachments{" "}
                        <span className="text-sm font-extralight">
                          (Aşama 4)
                        </span>
                      </h2>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                      <span className="text-xs text-slate-700 dark:text-darkTextColor">
                        Küçült
                      </span>
                      <ChevronDownIcon className="h-5 w-5 text-slate-500 dark:text-darkTextColor" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <AttachmentForm initialData={course} courseId={course.id} />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
