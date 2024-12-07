import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={`flex gap-4 items-center p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md cursor-pointer mt-2 ${
        isActive && "bg-slate-200 dark:bg-slate-800"
      }`}
    >
      <Icon className="w-6 h-6" />
      <h2>{label}</h2>
    </button>
  );
};
