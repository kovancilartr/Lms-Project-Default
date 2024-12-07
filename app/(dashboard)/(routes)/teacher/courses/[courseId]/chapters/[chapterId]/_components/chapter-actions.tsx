"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await fetch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast({
          title: "Successfully unpublished chapter",
          description: "Your chapter is now unpublished",
          variant: "success",
        });
      } else {
        await fetch(`/api/courses/${courseId}/chapters/${chapterId}/publish`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Successfully published chapter",
          description: "Your chapter is now published",
          variant: "success",
        });
      }

      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await fetch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Chapter deleted successfully",
        description: "You can now add lessons to your course",
        variant: "success",
      });
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Taslak" : "Yayınla"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={disabled} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
