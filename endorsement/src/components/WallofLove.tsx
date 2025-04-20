
import React, { useState, useEffect } from "react";
import {BentoGrid,BentoGridItem} from "@/components/BentoGrid.tsx";
import WallOfFameSkeleton from "@/skeletons/WallOfFameSkeleton.tsx";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils.ts"

export interface TweetInfo {
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

interface WallOfFameProps {
    userId?: string;
    getReviews: (userId: string) => Promise<{ tweetsText: TweetInfo[] }>;
    emptyState?: React.ReactNode;
    errorState?: (error: string) => React.ReactNode;
    loadingState?: React.ReactNode;
    className?: string;
}

export function WallOfFame({
                               userId,
                               getReviews,
                               emptyState,
                               errorState,
                               loadingState,
                               className
                           }: WallOfFameProps) {
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
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    if (isLoading) {
        return loadingState || <WallOfFameSkeleton />;
    }

    if (tweetsInfos?.length === 0) {
        return emptyState || (
            <div className="flex flex-col space-y-5 justify-center items-center mt-10">
                <h1 className="text-5xl text-black text-center font-bold max-w-4xl tracking-tight">
                    The Wall Looks Empty! Import Reviews To Showcase your Wall of
                    Achievement 😔😔😔
                </h1>
                <Link href={"/dashboard/import"}>

                        <span>Go To Import Review Section</span>
                        <ArrowUpRight />

                </Link>
            </div>
        );
    }

    if (error) return errorState?.(error) || <p>{error}</p>;

    return (
        <div className={cn("h-screen", className)}>
            <BentoGrid className="max-w-4xl mx-auto mt-7">
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