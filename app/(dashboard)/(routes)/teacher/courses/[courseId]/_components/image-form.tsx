"use client";
import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = formSchema.parse(values);
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      toast({
        title: "Course updated successfully",
        description: "You can now add lessons to your course",
        variant: "success",
      });
      console.log(data);
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="border bg-slate-100 dark:bg-darkBgColor800 p-4 rounded-md h-fit">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className="dark:hover:bg-darkBgColor700 mb-2"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-darkBgColor700 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="Course Image"
              fill
              className="rounded-md object-cover"
              src={initialData.imageUrl}
            />
          </AspectRatio>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended for best results
          </div>
        </div>
      )}
    </div>
  );
};
