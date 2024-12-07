"use client";
import { SignOutButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAuthContext } from "@/components/providers/auth-provider";
import AuthModal from "@/components/modals/auth-modal";

interface UserButtonProps {
  type: "default" | "modal";
}

const UserButton = ({ type }: UserButtonProps) => {
  const { currentUser } = useAuthContext();
  return (
    <>
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex flex-row items-center gap-1">
              <Image
                src={currentUser?.imageUrl || "/noAvatar.png"}
                alt=""
                width={1080}
                height={780}
                className="rounded-full w-10 h-10 border-2 border-lamaYellow"
              />
              <div className="flex flex-col items-center">
                <span className="text-xs leading-3 font-medium">
                  {currentUser?.firstName} {currentUser?.lastName}
                </span>
                <span className="text-[10px] text-black dark:text-white text-right">
                  {(currentUser?.publicMetadata?.role as string) === "admin"
                    ? "Admin"
                    : (currentUser?.publicMetadata?.role as string) ===
                      "teacher"
                    ? "Öğretmen"
                    : (currentUser?.publicMetadata?.role as string) === "parent"
                    ? "Veli"
                    : "Öğrenci"}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-slate-50 dark:bg-primary text-black p-2 rounded-md shadow-lg mt-4 
          transition-transform transform translate-y-2 opacity-0 animate-slide-in"
          >
            <DropdownMenuLabel className="flex flex-col items-center text-md">
              Hoş Geldin
              <span className="text-red-600" style={{ fontSize: "10px" }}>
                {currentUser?.id}
              </span>
              <span className="text-xs">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <span className="text-xs text-green-700">
                {(currentUser?.publicMetadata?.role as string) === "admin"
                  ? "Admin"
                  : (currentUser?.publicMetadata?.role as string) === "teacher"
                  ? "Öğretmen"
                  : (currentUser?.publicMetadata?.role as string) === "parent"
                  ? "Veli"
                  : "Öğrenci"}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/auth/profile">
              <DropdownMenuItem className="cursor-pointer">
                <span className="hidden lg:block">Hesabımı Yönet</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <span className="hidden lg:block">Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <SignOutButton>
                <span className="hidden lg:block">Çıkış Yap</span>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : type === "modal" ? (
        <AuthModal />
      ) : (
        <Link href="/auth/login">
          <Button variant="default" size="sm">
            Giriş Yap
          </Button>
        </Link>
      )}
    </>
  );
};

export default UserButton;
