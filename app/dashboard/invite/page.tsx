"use client"

import EmailTemplate from "@/components/EmailTemplate";
import {useSession} from "@/app/lib/auth-client";
import {Suspense} from "react";


export default function EmailSection() {
    const session = useSession();
    const userId = session?.data?.user.id


    return(
        <div>
            <h1 className="text-4xl font-semibold tracking-tight">Invite Others To Review</h1>
            <p className="font-medium mt-2 text-zinc-600 antialiased">Create and manage email templates, then send them
                manually or schedule automated delivery.</p>
            <h1 className="font-bold mt-20 ml-5">Email Templates</h1>
            <div className="mt-10 flex flex-col space-y-20">
                <Suspense fallback={<div>...Loading</div>}>
                    <EmailTemplate userId={userId!}/>
                </Suspense>

            </div>
        </div>
    )
}

