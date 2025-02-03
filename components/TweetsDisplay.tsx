import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRightFromLine,
  CheckCheck,
  CircleSlash,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteReview, getReviews, updateTweetStatus } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import NoReviewMessage from "./NoReviewMessage";
import TweetsDisplaySkeleton from "./skeletons/TweetDisplaySkeleton";

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

interface ReviewProps {
  userId: string | undefined;
  setTweetCount: (count: number) => void;
}

function TweetModal({ tweet }: { tweet: TweetInfo }) {
  return (
    <DialogContent className="sm:max-w-[425px] bg-black border-none">
      <div className="mt-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={tweet.profile} alt={tweet.username} />
            <AvatarFallback>{tweet.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="font-bold text-white">
              {tweet.username}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              @{tweet.handle}
            </DialogDescription>
          </div>
        </div>
        <p className="mt-4 text-white">{tweet.tweetContent}</p>
        {tweet.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="Tweet Media"
            width={300}
            height={300}
            className="mt-4 rounded-lg object-contain"
          />
        ))}
        <Badge className="mt-4 mr-2 bg-white text-black font-medium hover:bg-white ">
          <p>{format(new Date(tweet.createdAt), "MMM d, yyyy")}</p>
        </Badge>
        {tweet.status === "Approved" ? (
          <Badge className="mt-2 bg-teal-700 text-white hover:bg-teal-700 hover:text-white font-medium">
            <p>Status: {tweet.status}</p>
          </Badge>
        ) : tweet.status === "Rejected" ? (
          <Badge className="mt-2 bg-red-700 text-white hover:bg-red-700 hover:text-white font-medium">
            <p>Status: {tweet.status}</p>
          </Badge>
        ) : (
          <Badge className="mt-2 bg-white text-black hover:bg-white hover:text-black font-medium">
            <p>Status: {tweet.status}</p>
          </Badge>
        )}
      </div>
    </DialogContent>
  );
}

export default function TweetsDisplay({ userId, setTweetCount }: ReviewProps) {
  const [tweetsInfos, setTweetsInfos] = useState<TweetInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tweetPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const data = await getReviews(userId);
          setTweetsInfos(data?.tweetsText || []);
          setTweetCount(data?.tweetsText.length || 0);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [userId, setTweetCount]);

  async function handleApprovalChange(id: string, status: "Approved") {
    setTweetsInfos((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id ? { ...tweet, status: status } : tweet
      )
    );
    await updateTweetStatus(id, status);
  }

  async function handleRejectChange(id: string, status: "Rejected") {
    setTweetsInfos((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === id ? { ...tweet, status: status } : tweet
      )
    );
    await updateTweetStatus(id, status);
  }

  if (isLoading ) {
    return <TweetsDisplaySkeleton />;
  }

  if(tweetsInfos.length === 0){
    return <NoReviewMessage/>
  }

  const totalPages = Math.ceil(tweetsInfos.length / tweetPerPage);
  const indexofLastTweet = currentPage * tweetPerPage;
  const indexOfFirstTweet = indexofLastTweet - tweetPerPage;
  const currentTweets = tweetsInfos.slice(indexOfFirstTweet, indexofLastTweet);
  
  return (
    <div className="space-y-4 w-[1200px]">
      <hr className="mt-5" />
      
      {currentTweets.map((tweetsInfo) => (
        <div key={tweetsInfo.id}>
          <div className="flex justify-around hover:bg-zinc-100 transition-colors  duration-500 ease-in-out rounded-xl w-full items-center space-x-4 p-4 cursor-pointer">
            <div className="flex flex-col w-1/12  items-start">
              <AnimatedTooltip
                items={[
                  {
                    id: Number(tweetsInfo.id),
                    name: tweetsInfo.username,
                    designation: `@${tweetsInfo.handle}`,
                    image: tweetsInfo.profile,
                  },
                ]}
              />
            </div>

            <div className="flex flex-col w-6/12">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="space-y-5">
                    <p className="text-start">{tweetsInfo.tweetContent}</p>
                    <div className="grid grid-cols-3 space-x-2">
                      {tweetsInfo.images.map((image) => (
                        <Image
                          key={tweetsInfo.id}
                          src={image}
                          alt="Tweet Media"
                          width={200}
                          height={200}
                          className="rounded-lg object-contain max-h-50 w-[200px] "
                        />
                      ))}
                    </div>

                    <Badge className="mt-2">
                      {" "}
                      <p>
                        {format(new Date(tweetsInfo.createdAt), "MMM d, yyyy")}
                      </p>
                    </Badge>
                  </div>
                </DialogTrigger>

                <TweetModal tweet={tweetsInfo} />
              </Dialog>
            </div>

            <div className="flex w-3/12 flex-col justify-end items-end space-y-2">
              <DropDownMenus
                onApprove={() =>
                  handleApprovalChange(tweetsInfo.id, "Approved")
                }
                onDelete={async () => {
                  const updateTweet = await deleteReview(tweetsInfo.id, userId);
                  setTweetsInfos(updateTweet);
                  setTweetCount(updateTweet.length);
                }}
                onReject={() => {
                  handleRejectChange(tweetsInfo.id, "Rejected");
                }}
              />
              <div
                className={`h-10 min-w-[120px] text-center  px-4 py-2 border rounded-md font-medium text-xs ${
                  tweetsInfo.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : tweetsInfo.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-zinc-500/10 text-gray-800"
                }`}
              >
                {tweetsInfo.status === "Approved"
                  ? "Approved ✅"
                  : tweetsInfo.status === "Rejected"
                  ? "Rejected ❌"
                  : "Approval Pending 🏳️"}
              </div>
            </div>
          </div>
          <hr className="mt-5" />
        </div>
      ))}
      <div className="flex justify-between items-center space-x-2 mt-4">
        <div>
          <span className="text-sm text-zinc-600">
            Page {currentPage} of {totalPages} results
          </span>
        </div>
        <div className="flex items-center ">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5" />
            Previous
          </Button>
          <Button className="mr-3 ml-3">{currentPage}</Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DropDownMenus({
  onApprove,
  onDelete,
  onReject,
}: {
  onApprove: () => void;
  onDelete: () => void;
  onReject: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="w-[120px] rounded-lg bg-gradient-to-b space-x-1 from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2">
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem>
          <ArrowRightFromLine className="mr-2" />
          Export
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onApprove}>
          <CheckCheck className="mr-2" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReject}>
          <CircleSlash className="mr-2" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          <Trash2Icon className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
