import React from "react";
import AppLogo from "./AppLogo";
import MoreMenu from "./MoreMenu";
import { SideBarRoutes } from "./SideBarRoutes";

const SideBar = () => {
  return (
    <div className="h-screen shadow-md dark:shadow-sm dark:shadow-slate-700 px-4">
      <div className="flex flex-col items-center justify-center h-20">
        <AppLogo />
      </div>
      <div>
        <hr className="dark:border-slate-700" />
        <div>
          <SideBarRoutes />
        </div>
      </div>

      <div className="border-t absolute left-0 -bottom-2 w-full">
        <div className="flex flex-row px-4 pt-2 pb-4">
          <h2 className="text-[12px] cursor-default">
            Bu tasarım{" "}
            <span className="font-bold text-red-700 dark:text-primary">
              Kovancılar Yazılım
            </span>{" "}
            tarafından geliştirilmiştir.
          </h2>
          <MoreMenu />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

// global css tanımlanıcak bg-slate-100 dark:bg-slate-700 ve bg-slate-200 dark:bg-slate-800
