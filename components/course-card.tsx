import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition lime-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground dark:text-darkTextColor">
            {category}
          </p>
          <div className="my-2 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500 dark:text-darkTextColor">
              <IconBadge size="sm" icon={BookOpen} />
              <span>Ders Sayısı : {chaptersLength}</span>
            </div>
          </div>
          {progress !== null ? (
            <div>
              <CourseProgress variant={progress === 100 ? "success" : "default"} value={progress} size="sm" />
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700 dark:text-darkTextColor">
              {price !== 0 ? formatPrice(price) : "Ücretsiz"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
