import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WallOffameSkeletonComp = () => {
  const skeletonItems = Array(3).fill(null);

  return (
    <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto mt-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="row-span-1 rounded-xl p-4 bg-white border shadow-input dark:bg-black dark:border-white/[0.2] flex flex-col"
        >
          <div className="relative w-[400px] h-[70%] mb-3">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>

          <div className="flex items-center mb-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WallOffameSkeletonComp;
