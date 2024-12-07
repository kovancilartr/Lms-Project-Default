import { LucideSquarePower } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthContext } from "./providers/auth-provider";
import { UserDropdownMenu } from "./modals/user-menu-dropdown";

export const UserHoverCard = () => {
  const { currentUser } = useAuthContext();
  console.log("Current User", currentUser);
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserDropdownMenu />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={currentUser?.imageUrl || "/noAvatar.png"} />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex flex-col space-y-0">
              <h4 className="text-sm font-semibold">{currentUser?.fullName}</h4>
              <span className="text-xs">{currentUser?.id}</span>
            </div>
            <p className="text-sm">
              {currentUser?.primaryEmailAddress?.emailAddress}
            </p>
            <div className="flex items-center pt-1">
              <LucideSquarePower className="mr-2 h-4 w-4" />{" "}
              <span className="text-xs text-muted-foreground">
                {currentUser?.publicMetadata?.role}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
