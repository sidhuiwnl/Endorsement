import { signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
    >
      <div className="underline text-sm font-medium">Logout</div>
    </button>
  );
}
