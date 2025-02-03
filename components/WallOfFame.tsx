"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { getReviews } from "@/server/queries";
import { useSession } from "@/app/lib/auth-client";
import WallOfSkeletonComp from "./skeletons/WallOffameSkeleton";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface TweetInfo {
  profile: string;
  username: string;
  handle: string | null;
  jobTitle: string | null;
  tweetContent: string;
  verified: boolean;
  id: string;
  userId: string;
  createdAt: Date;
  images: string[];
  status: string;
  rating: number;
}

export function LayoutGridDemo() {
  const session = useSession();
  const userId = session.data?.user.id;
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (userId) {
      setIsLoading(true);
      try {
        setError(null);
        const data = await getReviews(userId);
        const filteredTweet = data?.tweetsText.filter(
          (tweet) => tweet.status === "Approved"
        );
        setTweetsInfos(filteredTweet);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (isLoading) {
    return <WallOfSkeletonComp />;
  }

  if (tweetsInfos?.length === 0) {
    return (
      <div className="flex flex-col space-y-5 justify-center items-center mt-10">
        <h1 className="text-5xl text-black text-center font-bold max-w-4xl tracking-tight">
          The Wall Looks Empty! Import Reviews To Showcase your Wall of
          Achievement 😔😔😔
        </h1>
        <Link href={"/dashboard/import"}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black  text-white flex items-center space-x-2"
          >
            <span>Go To Import Review Section</span>
            <ArrowUpRight />
          </HoverBorderGradient>
        </Link>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen">
      <BentoGrid className="max-w-4xl mx-auto  mt-7">
        {tweetsInfos?.map((tweetsInfo, i) => (
          <BentoGridItem
            key={tweetsInfo.id}
            title={tweetsInfo.username}
            description={tweetsInfo.tweetContent}
            imageUrl={tweetsInfo.images[0]}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
