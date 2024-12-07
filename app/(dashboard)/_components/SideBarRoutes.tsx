import { BarChart, LayoutDashboard, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarItem } from "./SidebarItem";
import { useAuthContext } from "@/components/providers/auth-provider";

export const SideBarRoutes = () => {
  const { currentUser, loading } = useAuthContext();
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  const guestRoutes = [
    {
      name: "Ana Sayfa",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Hakkımda",
      icon: Shield,
      path: "/about",
    },
    {
      name: "Browser",
      icon: BarChart,
      path: "/search",
    },
  ];

  const teacherRoutes = [
    {
      name: "Ana Sayfa",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "Courses",
      icon: Shield,
      path: "/teacher/courses",
    },
    {
      name: "Analytics",
      icon: BarChart,
      path: "/teacher/analytics",
    },
    ...(currentUser
      ? [
          {
            name: "Profil",
            icon: UserCircle,
            path: "/auth/profile",
          },
        ]
      : []),
  ];

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {!loading &&
        routes.map((route, index) => (
          <SidebarItem
            key={index}
            icon={route.icon}
            label={route.name}
            href={route.path}
          />
        ))}
    </div>
  );
};
