"use client";

import { useState } from "react";
import Review from "@/components/ReviewComponent";
import { useSession } from "@/app/lib/auth-client";



export default function ReviewClient() {
  const session = useSession();
  const userId  = session.data?.user.id
  
  const [tweetCount, setTweetCount] = useState(0);

  return (
    <div className="space-y-3">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        My Reviews <span className="text-black">({tweetCount})</span>
      </h1>
      <p className="font-medium mt-2 text-zinc-600 antialiased">
      Centralize your review management and selectively approve preferred feedback.
      </p>
      <Review userId={userId} setTweetCount={setTweetCount} />
    </div>
  );
}
