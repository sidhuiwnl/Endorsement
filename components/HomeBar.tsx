"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import SignOut from "./Signout";

export default function HomeBar(){
    return(
        <div className="w-screen flex justify-around p-5 items-center">
            <div className="underline text-sm">
                Testimonial
            </div>
            <div className="space-x-3">
                <SignOut/>
                <Link href={"/dashboard/reviews"}>
                
                <Button 
                className="w-[120px] rounded-lg bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-10 px-4 py-2 "
                >Dashboard
                <ChevronRight/>
                </Button>
                </Link>
            </div>
        </div>
    )
}


