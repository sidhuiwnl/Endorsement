"use client"

import {CopyIcon} from "lucide-react";
import {useSession} from "@/utils/auth-client";
import {redirect} from "next/navigation";
import { toast } from "sonner"
import {useEffect} from "react";

export default function Form(){
    const session = useSession();
    const user = session?.data?.user;
    const username = user?.name.replace(/\s+/g,'').toLowerCase();


    useEffect(() => {
        if (!user) {
            redirect("/login");
        }
    }, []);

    return (
        <div>
            <h1 className='text-4xl font-semibold tracking-tight'>Your Collections</h1>
            <p className="font-medium mt-2 text-zinc-600 antialiased">Share your link with people to collect reviews.</p>
            <p className="mt-7 font-medium text-neutral-600">Your Link:</p>
            <p className="flex flex-row items-center space-x-2">
                <span

                    className="text-teal-700 font-medium"
                >{`${window.location.origin}/${username}/review`}</span>
                <CopyIcon
                    width={15}
                    height={15}
                    className="cursor-pointer "
                    onClick={() => {
                        const link = `${window.location.origin}/${username}/review`
                        window.navigator.clipboard.writeText(link);
                        toast.success("The Link has been copied!");
                    }}
                />
            </p>
        </div>
    )
}