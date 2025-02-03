import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { Badge } from "./badge";
import { useState } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imageUrl,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  imageUrl?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageAspect, setImageAspect] = useState<
    "portrait" | "landscape" | "square"
  >("square");

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    if (aspectRatio > 1.2) {
      setImageAspect("landscape");
    } else if (aspectRatio < 0.8) {
      setImageAspect("portrait");
    } else {
      setImageAspect("square");
    }

    setImageLoaded(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border",
        className
      )}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans font-medium text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-2">
            <Badge>{title}</Badge>
          </div>
        </div>

        <div
          className={cn(
            "relative flex-1 mt-3 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800",
            imageAspect === "landscape"
              ? "aspect-video"
              : imageAspect === "portrait"
              ? "aspect-[3/4]"
              : "aspect-square"
          )}
        >
          {imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
              )}

              <Image
                src={imageUrl}
                alt={typeof title === "string" ? title : "Bento grid item"}
                fill
                className={cn(
                  "object-cover transition-all duration-200 group-hover/bento:scale-105",
                  !imageLoaded && "opacity-0",
                  imageLoaded && "opacity-100"
                )}
                onLoad={handleImageLoad}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
