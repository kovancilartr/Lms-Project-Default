"use client";

import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppLogo = () => {
  return (
    <>
      <Link href="/" className="flex item-center">
        <Image src="/logo.svg" alt="logo" width={140} height={10} />
      </Link>
      <ModeToggle variant="themeToggle" />
    </>
  );
};

export default AppLogo;
