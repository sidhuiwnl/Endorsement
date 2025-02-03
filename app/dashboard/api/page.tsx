"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { Eye, Copy } from "lucide-react";
import { toast } from "sonner";

export default function Api() {
  const session = useSession();
  const userId = session.data?.user.id;

  const [apiKey, setApiKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session && userId) {
      setApiKey(userId);
    }
  }, [userId]);

  function handlePassword() {
    setShowPassword((prev) => !prev);
  }

  function copyToClipboard() {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("Copied the api key");
    } else {
      toast.error("failed to copy");
    }
  }

  return (
    <div className="space-y-3 h-screen">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Api Key
      </h1>
      <p className="font-medium mt-2 text-zinc-600 antialiased">
        Collect high-quality reviews on autopilot.
      </p>
      <h1 className="font-medium">Your Api key</h1>

      <div className="flex">
        <input
          className="border border-neutral-700 p-2 w-[700px] rounded-l  text-black"
          type={showPassword ? "text" : "password"}
          value={apiKey}
        />
        <button
          className="border border-neutral-700 px-3 bg-gradient-to-b from-neutral-600 to-neutral-700 text-white"
          onClick={handlePassword}
        >
          <Eye />
        </button>
        <button
          className="border border-neutral-700 px-3 rounded-r bg-gradient-to-b from-neutral-600 to-neutral-700 text-white"
          onClick={copyToClipboard}
        >
          <Copy />
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Keep your API key secret. Do not share it with others or expose it in
        any client-side code.
      </p>
    </div>
  );
}
