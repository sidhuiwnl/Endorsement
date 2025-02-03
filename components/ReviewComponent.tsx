interface ReviewProps {
  userId: string | undefined;
  setTweetCount: (count: number) => void;
}

import TweetsDisplay from "./TweetsDisplay";

export default function Review({ userId, setTweetCount }: ReviewProps) {
  return <TweetsDisplay userId={userId} setTweetCount={setTweetCount} />;
}
