import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}
export const InfoCard = ({
  variant,
  icon: Icon,
  label,
  numberOfItems,
}: InfoCardProps) => {
  return (
    <div className="border bg-slate-100 rounded-md flex items-center gap-x-2 p-3 shadow-md">
      <IconBadge variant={variant} icon={Icon} size="sm" />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};
