import Link from "next/link";


export default function Navbar() {
  
  return (
    <header className="flex h-16 w-screen items-center justify-between bg-background tracking-tighter  py-4 sm:px-6 ">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-lg font-bold hover:underline"
          prefetch={false}
        >
          Testimonial
        </Link>
        
      </div>
      <div className="font-bold">Welcome Sidharth</div>
    </header>
  );
}
