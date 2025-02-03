"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileImage } from "lucide-react";
import { useState } from "react";
import { useTweet } from "react-tweet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import { addTweet } from "@/server/queries";

export default function TwitterInt() {
  return <TwitterForm />;
}

function TwitterForm() {
  const session = useSession();
  const user = session.data?.user;

  const [tweetUrl, setTweetUrl] = useState("");
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [tweetContent, setTweetContent] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [mediaFiles, setMediaFiles] = useState<string[] | undefined | null>(
    null
  );

  const { data: tweet } = useTweet(tweetUrl);

  function getTweetId(url: string) {
    const regex = /\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function preAddDetails() {
    if (tweet) {
      setUsername(tweet.user.name);
      setHandle(tweet.user.screen_name);
      setTweetContent(tweet.text.replace(/https?:\/\/[^\s]+/g, "").trim());
      setIsVerified(tweet.user.is_blue_verified || false);
      setUserImage(tweet.user.profile_image_url_https.replace("_normal", ""));
    }

    const images = tweet?.mediaDetails?.map((image) => image.media_url_https);
    setMediaFiles(images);
  }

  async function addData() {
    if (user) {
      try {
        await addTweet({
          user,
          username,
          handle,
          tweetContent,
          isVerified,
          userImage: userImage ?? "",
          mediaFiles: mediaFiles ?? [],
        });
      } catch (error) {
        console.error("Error adding tweet or uploading images:", error);
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUserImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  function reset() {
    setUsername("");
    setHandle("");
    setTweetContent("");
    setIsVerified(false);
    setUserImage(null);
    setMediaFiles(null);
  }

  console.log(tweet);

  return (
    <div className="w-[1100px] space-y-5">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Tweet.
      </h1>
      <div className=" mt-7 p-5 rounded-lg">
        <div className="mb-4">
          <h2 className="text-base font-semibold">Pre-fill information</h2>
          <p className="text-sm text-gray-600">
            Paste a tweet URL to pre-fill information.
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <Input
            placeholder="https://twitter.com/user/status/1234567890"
            className="flex-grow bg-white h-15 px-3"
            onChange={(e) => {
              const tweetId = getTweetId(e.target.value);
              if (tweetId) {
                setTweetUrl(tweetId);
              }
            }}
            required
          />
          <Button
            className="w-[120px] rounded-lg bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2 "
            onClick={preAddDetails}
          >
            Pre-fill Tweet
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Profile Picture</h2>
          <p className="text-sm text-gray-600">Author avatar picture.</p>
        </div>
        <div className="w-3/4">
          <Label
            htmlFor="dropzone-file1"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {userImage ? (
                <Avatar>
                  <AvatarImage
                    src={userImage}
                    alt="Uploaded Image"
                    className="object-contain"
                  />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              ) : (
                <FileImage className=" mb-3 " />
              )}
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <Input
              id="dropzone-file1"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Label>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">User Information</h2>
          <p className="text-sm text-gray-600">
            Author name and twitter handle.
          </p>
        </div>
        <div className="w-3/4 space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Sidharth Babu"
              type="text"
              id="username"
              className="h-10 w-full"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <Label htmlFor="handle">Handle</Label>
            <Input
              placeholder="@Sidharth Babu"
              type="text"
              id="handle"
              className="h-10 w-full"
              onChange={(e) => setHandle(e.target.value)}
              value={handle}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Tweet Content</h2>
        </div>
        <div className="w-3/4">
          <Textarea
            placeholder="Enter tweet content here..."
            className="h-[200px] w-full "
            onChange={(e) => setTweetContent(e.target.value)}
            value={tweetContent}
          />
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Settings</h2>
        </div>
        <div className="w-3/4">
          <div className="flex items-center space-x-2">
            <Switch
              id="verification"
              checked={isVerified}
              onCheckedChange={setIsVerified}
            />
            <Label htmlFor="verification">Verification badge</Label>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-center">
        <div className="w-1/4">
          <h2 className="text-base font-semibold">Image</h2>
          <p className="text-sm text-gray-600">
            Images to display in the tweet.
          </p>
        </div>
        {mediaFiles ? (
          <TweetImage mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
        ) : (
          <NonTweetImage />
        )}
      </div>
      <hr />
      <div className="flex space-x-2 justify-end">
        <Button
          onClick={reset}
          className="hover:bg-red-500 hover:text-white bg-white text-black w-30 px-4 h-10 text-center"
        >
          <Trash2 className=" w-8 h-4" />
          Reset
        </Button>
        <Button
          className="w-[120px] rounded-lg bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2 "
          onClick={addData}
        >
          Import Tweet
        </Button>
      </div>
    </div>
  );
}

function NonTweetImage() {
  return (
    <div className="w-3/4">
      <Label
        htmlFor="dropzone-file2"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FileImage className="mb-3 " />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </Label>
    </div>
  );
}

function TweetImage({
  mediaFiles,
  setMediaFiles,
}: {
  mediaFiles: string[];
  setMediaFiles: React.Dispatch<
    React.SetStateAction<string[] | undefined | null>
  >;
}) {
  return (
    <div className="w-3/4  flex flex-row space-x-2">
      {mediaFiles.map((mediaFile, index) => (
        <div
          key={index}
          className="relative w-40 h-40flex items-center justify-center rounded-xl"
        >
          <Image
            src={mediaFile}
            alt="user content"
            layout="fill"
            objectFit="cover"
            className="rounded-xl "
          />
          <Button
            onClick={() => {
              setMediaFiles((prevFiles) =>
                prevFiles?.filter((_, i) => i != index)
              );
            }}
          >
            <XIcon className="absolute top-1 right-1 w-5 h-5 text-white cursor-pointer bg-slate-400 rounded-full p-1 hover:bg-white hover:text-black" />
          </Button>
        </div>
      ))}

      <Label
        htmlFor="dropzone-file3"
        className="w-40 h-40 flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
      >
        <span className="text-gray-400">
          <FileImage />
        </span>
      </Label>
    </div>
  );
}
