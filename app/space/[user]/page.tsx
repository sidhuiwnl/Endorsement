"use client"

import { useSession } from "@/app/lib/auth-client"

export default function UserSpace(){
  const session = useSession();
  return(
    <div>
     {session.data?.user.email}
    </div>
  )
}