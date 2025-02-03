import Image from "next/image";
import tweet1 from "@/public/tweet1.png";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ImportReview() {
  return (
    <Link href={"/dashboard/import/twitter"}>
      <div className="hover:cursor-pointer">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">
          Import.
        </h1>
        <p className="font-medium mt-2 text-zinc-600 antialiased">
          Bring your reviews from various social platforms into a single place.
        </p>
        <div className="relative mt-4 p-4  rounded-lg max-w-[400px]  space-y-2 overflow-hidden group bg-gray-100 ">
          <Image src={tweet1} className="rounded-xl" alt="twitter" />

          <Badge className="font-medium antialiased text-white">
            Twitter 𝕏
          </Badge>

          <div className="absolute bottom-3 right-4 text-gray-500 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
}
