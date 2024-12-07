"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
const CreatePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      router.push(`/teacher/courses/${data.id}`);
      toast({
        title: "Course created successfully",
        description: "You can now add lessons to your course",
        variant: "default",
      });
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
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 flex-col">
      <h1 className="text-2xl">Name your course</h1>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Integer quis.
        Sed velit. Praesent. Nulla. Pellentesque.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center gap-x-2">
            <Link href="/">
              <Button variant="ghost" type="button" className="w-full">
                İptal
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              İleri
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
