"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { UserHoverCard } from "./user-hover-card";
import { useAuth } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex w-full items-center justify-end gap-2">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
              Geri Dön
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserHoverCard />
      </div>
    </>
  );
};
