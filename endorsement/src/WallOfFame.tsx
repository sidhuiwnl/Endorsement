
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";


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


function WallOfFameGrid({
                            className,
                            title,
                            description,
                            imageUrl,
                            userImage,
                            handle,
                        }: {
    className: string;
    title: string;
    imageUrl: string;
    description: string;
    userImage: string;
    handle: string;
}) {
    return (
        <div className={`crotus-border crotus-rounded-xl crotus-p-4 crotus-mt-5 crotus-bg-gray-50 crotus-w-full crotus-flex crotus-flex-col crotus-gap-3 ${className}`}>
            <p className="crotus-text-sm crotus-font-medium">
                {description}
            </p>
            {imageUrl && (
                <img
                    className="crotus-object-contain crotus-rounded-lg"
                    src={imageUrl}
                    alt={`Review by ${title}`}
                />
            )}
            <div className="crotus-flex crotus-flex-row crotus-items-center crotus-gap-2">
                <div className="crotus-relative crotus-inline-block crotus-h-8 crotus-w-8 crotus-rounded-full crotus-overflow-hidden">
                    <img
                        className="crotus-h-full crotus-w-full crotus-object-cover"
                        src={userImage}
                        alt={title}
                    />
                </div>
                <div className="crotus-flex crotus-flex-col crotus-ml-2">
                    <p className="crotus-text-sm crotus-font-bold">{title}</p>
                    <p className="crotus-text-sm">@{handle}</p>
                </div>
            </div>
        </div>
    );
}

// Skeleton loader component
function WallOfSkeletonComp() {
    return (
        <div className="crotus-grid crotus-grid-cols-1 sm:crotus-grid-cols-2 lg:crotus-grid-cols-3 crotus-auto-rows-auto crotus-gap-2">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="crotus-border crotus-rounded-xl crotus-p-4 crotus-mt-5 crotus-bg-gray-50 crotus-animate-pulse">
                    <div className="crotus-h-4 crotus-bg-gray-200 crotus-rounded crotus-mb-4 crotus-w-3/4"></div>
                    <div className="crotus-h-40 crotus-bg-gray-200 crotus-rounded crotus-mb-4"></div>
                    <div className="crotus-flex crotus-items-center">
                        <div className="crotus-h-8 crotus-w-8 crotus-bg-gray-200 crotus-rounded-full"></div>
                        <div className="crotus-ml-2">
                            <div className="crotus-h-3 crotus-bg-gray-200 crotus-rounded crotus-w-20 crotus-mb-1"></div>
                            <div className="crotus-h-3 crotus-bg-gray-200 crotus-rounded crotus-w-16"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Fetch reviews function
async function fetchReviews(userId: string): Promise<TweetInfo[]> {
    try {
        const response = await fetch(`/api/testimonial?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();

        console.log("data", data);
        return data.tweetsText.filter((tweet: TweetInfo) => tweet.status === "Approved");
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}


export function WallOfFame({ projectId, importLink = "/dashboard/import" }: { projectId: string; importLink?: string }) {
    const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!projectId) {
                setError("Project ID is required");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await fetchReviews(projectId);
                setTweetsInfos(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Failed to load reviews.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [projectId]);

    if (isLoading) {
        return <WallOfSkeletonComp />;
    }

    if (!tweetsInfos || tweetsInfos.length === 0) {
        return (
            <div className="crotus-flex crotus-flex-col crotus-space-y-5 crotus-justify-center crotus-items-center crotus-mt-10">
                <h1 className="crotus-text-3xl md:crotus-text-5xl crotus-text-black crotus-text-center crotus-font-bold crotus-max-w-4xl crotus-tracking-tight">
                    The Wall Looks Empty! Import Reviews To Showcase your Wall of Achievement 😔
                </h1>
                <link href={importLink} className="crotus-bg-black crotus-text-white crotus-px-4 crotus-py-2 crotus-rounded-full crotus-flex crotus-items-center crotus-space-x-2 crotus-border crotus-border-gray-300 hover:crotus-border-gray-400 crotus-transition-all">
                    <span>Go To Import Review Section</span>
                    <ArrowUpRight className="crotus-ml-2" size={16} />
                </link>
            </div>
        );
    }

    if (error) return <p className="crotus-text-red-500">{error}</p>;

    return (
        <div className="crotus-grid crotus-grid-cols-1 sm:crotus-grid-cols-2 lg:crotus-grid-cols-3 crotus-auto-rows-auto crotus-gap-2">
            {tweetsInfos.map((tweetsInfo, i) => (
                <WallOfFameGrid
                    key={tweetsInfo.id}
                    title={tweetsInfo.username}
                    handle={tweetsInfo.handle || ""}
                    userImage={tweetsInfo.profile}
                    description={tweetsInfo.tweetContent}
                    imageUrl={tweetsInfo.images[0]}
                    className={i === 3 || i === 6 ? "md:crotus-col-span-2" : ""}
                />
            ))}
        </div>
    );
}
