"use client"

import { useSession } from "@/utils/auth-client"

export default function UserSpace(){
  const session = useSession();
  return(
    <div>
     {session.data?.user.email}
    </div>
  )
}