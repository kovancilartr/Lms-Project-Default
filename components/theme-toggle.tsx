"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export interface ModeToggleProps {
  footer?: boolean;
  variant?: "ghost" | "themeToggle";
}

export function ModeToggle({ footer, variant }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDisabled = false; // Butonun Disable durumunu kontrol eder.

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sunClass = `h-[1.2rem] w-[1.2rem] ${
    theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
  } transition-all`;
  const moonClass = `absolute h-[1.2rem] w-[1.2rem] ${
    theme === "dark" ? "rotate-0 scale-100 text-black" : "rotate-90 scale-0"
  } transition-all`;

  return (
    <>
      {footer ? (
        <div className="flex flex-col items-center justify-center space-x-2 mt-4">
          <h1>Temayı Değiştir</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className={sunClass} />
            <Moon className={moonClass} />
          </Button>
        </div>
      ) : (
        <div className="relative group">
          <Button
            disabled={isDisabled}
            variant={variant}
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className={sunClass + " text-black"} />
            <Moon className={moonClass + " text-white"} />
          </Button>
          {isDisabled && (
            <span
              className="cursor-default absolute left-1/2 top-6 transform -translate-x-1/2 mt-2 w-max
             bg-red-600 text-white font-bold text-xs rounded py-1 px-2 
             opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Yapım Aşamasında
            </span>
          )}
        </div>
      )}
    </>
  );
}
