import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TweetsDisplaySkeleton = () => {
  const skeletonItems = Array(3).fill(null);

  return (
    <div className="space-y-2 w-[1200px]">
      <hr className="mt-5" />
      {skeletonItems.map((_, index) => (
        <div key={index}>
          <div className="flex justify-around hover:bg-zinc-100 transition-colors duration-500 ease-in-out rounded-xl w-full items-center space-x-4 p-4">
            <div className="flex flex-col w-1/12 space-y-2 items-start">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>

            <div className="flex flex-col w-6/12 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-[200px] w-[200px] rounded-lg" />
                <Skeleton className="h-[200px] w-[200px] rounded-lg" />
                <Skeleton className="h-[200px] w-[200px] rounded-lg" />
              </div>

              <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex w-3/12 flex-col justify-end items-end space-y-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <hr className="mt-5" />
        </div>
      ))}
    </div>
  );
};

export default TweetsDisplaySkeleton;
