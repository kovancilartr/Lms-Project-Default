"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "../providers/auth-provider";
import UserButton from "@/app/(dashboard)/_components/UserButton";
import { Button } from "../ui/button";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

export const UserDropdownMenu = () => {
  const { currentUser } = useAuthContext();

  return (
    <DropdownMenu>
      {currentUser ? (
        <DropdownMenuTrigger asChild>
          <Button
            variant="avatarGhost"
            size="sm"
            className="focus-visible:ring-0"
          >
            <Image
              src={currentUser?.imageUrl || "/noAvatar.png"}
              alt=""
              width={1080}
              height={780}
              className="rounded-full w-10 h-10 border-2 border-amber-300"
            />
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <UserButton type="modal" />
      )}

      <DropdownMenuContent className="">
        <DropdownMenuLabel className="flex flex-col items-center text-md">
          <span className="text-xs leading-3 font-medium">
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton>Çıkış Yap</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
