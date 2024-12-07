"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      toast({
        title: "Course updated successfully",
        description: "You can now add lessons to your course",
        variant: "success",
      });
      toggleEdit();
      console.log(data);
      router.refresh();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
      form.reset();
    }
  };
  return (
    <div className="border bg-slate-100 dark:bg-darkBgColor800 p-4 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className="dark:hover:bg-darkBgColor700"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price !== null
            ? formatPrice(initialData.price)
            : "Kurs ücreti belirlemedi!"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting || field.value === 0}
                        placeholder="Kursunuz için bir fiyat belirleyin"
                        className=" dark:bg-darkBgColor700 dark:text-darkTextColor"
                        {...field}
                      />
                      <div className="flex flex-row items-center justify-end gap-x-2">
                        <Checkbox
                          id="price-free"
                          checked={field.value === 0}
                          onCheckedChange={(e) => {
                            field.onChange(e ? 0 : initialData.price || 0.01);
                            field.onBlur();
                          }}
                        />
                        <Label htmlFor="price-free" className="cursor-pointer">
                          Ücretsiz Kurs
                        </Label>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 justify-end">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-1/3 dark:bg-darkBgColor700 dark:text-darkTextColor"
              >
                Kaydet
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
