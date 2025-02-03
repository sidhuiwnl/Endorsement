"use client";

import { signIn } from "@/app/lib/auth-client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen w-full bg-zinc-950 bg-grid-gray-600/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl sm:text-3xl font-medium relative z-20 bg-clip-text text-white py-5">
          Login to your Account
        </p>
        <button
          className="bg-white text-center w-[500px] h-[50px] rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
          onClick={async () => {
            await signIn.social({
              provider: "github",
              callbackURL : "/"
            });
        
          }}
        >
          <GitHubLogoIcon className="w-5 h-5" />
          <span className="text-sm antialiased">Continue with Github</span>
        </button>
        
        <Link
          href={"https://x.com/sidharth_b26649"}
          className="text-zinc-500 text-sm absolute bottom-0"
        >
          Sidharth Babu
        </Link>
      </div>
    </div>
  );
}
