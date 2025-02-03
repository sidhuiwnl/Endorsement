import Safari from "@/components/ui/safari";


export default function HeroSection() {
  return (
      <div className="flex justify-center">
        <div className="relative flex flex-col items-center py-24 dark:bg-black bg-white rounded-lg max-w-6xl w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">

          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>

          <p className="text-sm text-green-700 font-semibold antialiased mb-5">
            Instant SaaS Reviews
          </p>
          <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center mb-4">
            Gather, Organize & Integrate
          </h1>
          <h1 className="text-6xl max-w-4xl font-semibold text-[#222222] tracking-tight mx:auto text-center">
            Premium Reviews as Code.
          </h1>
          <p className="text-sm max-w-3xl mt-9 text-slate-600 text-center mb-10">
            Take complete charge of your brand&apos;s image with static,
            pre-optimized review components. Just copy & paste to display
            engaging reviews on your website.
          </p>
          <div className="relative">
            <Safari
                url="testimonial-vert.vercel.app"
                className="size-full"
                imageSrc={"https://us7xgl2xx9.ufs.sh/f/NLwJvYRc8DXfIfZipfaRns6xz2YmqoMfX40btuQZGJr7iAyK"}
            />
          </div>
        </div>
      </div>
  );
}
