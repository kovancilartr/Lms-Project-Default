"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await fetch(`/api/courses/${courseId}/unpublish`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Successfully unpublished chapter",
          description: "Your course is now unpublished",
          variant: "success",
        });
      } else {
        await fetch(`/api/courses/${courseId}/publish`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Successfully published chapter",
          description: "Your course is now published",
          variant: "success",
        });
        confetti.onOpen();
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

      await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Course deleted successfully",
        description: "You can now add lessons to your course",
        variant: "success",
      });
      router.refresh();
      router.push(`/teacher/courses`);
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
