import { cn } from "@/utils.ts"
import { useState } from "react";

// Fallback components
const DefaultBadge = ({children}: {children: React.ReactNode}) => (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
    {children}
  </span>
);

const DefaultImage = (props: any) => (
    <img
        {...props}
        style={props.fill ? {width: '100%', height: '100%', objectFit: 'cover'} : {}}
    />
);

export interface BentoGridProps {
    className?: string;
    children?: React.ReactNode;
    columns?: number;
    rowHeight?: string;
}

export const BentoGrid = ({
                              className,
                              children,
                              columns = 3,
                              rowHeight = "18rem"
                          }: BentoGridProps) => {
    return (
        <div
            className={cn(
                `grid md:auto-rows-[${rowHeight}] grid-cols-1 md:grid-cols-${columns} gap-3 max-w-7xl mx-auto`,
                className
            )}
        >
            {children}
        </div>
    );
};

export interface BentoGridItemProps {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    imageUrl?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onClick?: () => void;
    Badge?: React.ComponentType<{children: React.ReactNode}>;
    Image?: React.ComponentType<any>;
}

export const BentoGridItem = ({
                                  className,
                                  title,
                                  description,
                                  imageUrl,
                                  header,
                                  footer,
                                  onClick,
                                  Badge = DefaultBadge,
                                  Image = DefaultImage
                              }: BentoGridItemProps) => {
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
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            <div className="p-4 h-full flex flex-col">
                {header}

                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    <div className="font-sans font-medium text-neutral-600 text-xs dark:text-neutral-300">
                        {description}
                    </div>
                    {title && (
                        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-2">
                            <Badge>{title}</Badge>
                        </div>
                    )}
                </div>

                {imageUrl && (
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
                        {!imageError ? (
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
                )}

                {footer}
            </div>
        </div>
    );
};