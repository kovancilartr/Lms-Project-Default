import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Ellipsis, ExternalLink } from "lucide-react";

const MoreMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute left-2 bottom-6">
          <DropdownMenuItem className="cursor-pointer">
            <Link
              className="text-black dark:text-white flex flex-row gap-2 justify-center items-center"
              href={"/contact"}
            >
              <ExternalLink className="w-4 h-4" />
              İletişim
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              className="text-black dark:text-white flex flex-row gap-2 justify-center items-center"
              href={"/privacy-policy-tr"}
            >
              <ExternalLink className="w-4 h-4" />
              Gizlilik Politikası{" "}
              <span className="text-xs text-red-600 dark:text-primary absolute right-6 top-2 rotate-45">
                (TR)
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              className="text-black dark:text-white flex flex-row gap-2 justify-center items-center"
              href={"/privacy-policy-en"}
            >
              <ExternalLink className="w-4 h-4" />
              Privacy Policy{" "}
              <span className="text-xs text-red-600 dark:text-primary absolute right-5 top-1 rotate-45">
                (EN)
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoreMenu;
