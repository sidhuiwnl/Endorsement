"use client";

import { LayoutGridDemo } from "@/components/WallOfFame";
import { Eye, Code } from "lucide-react";
import { useState } from "react";
import CodePreview from "@/components/CodePreview";

export default function WallOfFame() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
        Fame Wall.
      </h1>
      <ToggleButton />
    </div>
  );
}

const ToggleButton = () => {
  const [activeButton, setActiveButton] = useState("preview");

  return (
    <>
    <div className="relative flex items-center bg-zinc-100/50 backdrop-blur-sm w-[240px] h-[48px] rounded-xl p-1.5 shadow-sm border border-zinc-200 mt-4">
      <div
        className={`
          absolute 
          h-[36px] 
          w-[110px]
          bg-white 
          rounded-lg
          shadow-sm
          border border-zinc-200
          transition-all 
          duration-300 
          ease-in-out
          ${activeButton === "code" ? "translate-x-[114px]" : "translate-x-0"}
        `}
      />

      <button
        onClick={() => setActiveButton("preview")}
        className={`
          relative
          flex 
          items-center 
          justify-center 
          w-[110px]
          h-[36px]
          rounded-lg
          font-medium 
          transition-colors
          duration-300
          ${
            activeButton === "preview"
              ? "text-zinc-800"
              : "text-zinc-500 hover:text-zinc-700"
          }
        `}
      >
        <Eye
          className={`
            mr-2 
            w-4 
            h-4 
            transition-transform 
            duration-300
            ${activeButton === "preview" ? "scale-110" : "scale-90"}
          `}
        />
        Preview
      </button>

      <button
        onClick={() => setActiveButton("code")}
        className={`
          relative
          flex 
          items-center 
          justify-center 
          w-[110px]
          h-[36px]
          rounded-lg
          font-medium 
          transition-colors
          duration-300
          ${
            activeButton === "code"
              ? "text-zinc-800"
              : "text-zinc-500 hover:text-zinc-700"
          }
        `}
      >
        <Code
          className={`
            mr-2 
            w-4 
            h-4 
            transition-transform 
            duration-300
            ${activeButton === "code" ? "scale-110" : "scale-90"}
          `}
        />
        Code
      </button>
      
    </div>
    {activeButton === "preview" ? <LayoutGridDemo /> : <CodePreview />}
    </>
  );
};
