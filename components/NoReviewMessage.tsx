import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function NoReviewMessage() {
  const url = "https://testimonial-vert.vercel.app/dashboard/import";

  function handleCopy() {
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("Copied the review url");
    }
  }
  return (
    <div className="w-[900px] h-[300px] flex flex-col p-5 border-2   rounded-lg justify-center items-center bg-gradient-to-b from-neutral-700 to-neutral-800">
      <h1 className="text-white mb-4">No Reviews Yet? Import the Reviews</h1>
      <div className="flex  items-center space-x-2 justify-center w-full">
        <input
          className="w-[600px] p-2  border border-neutral-700 rounded-sm mt-2"
          value={url}
          readOnly
        />
        <button className="p-2" onClick={handleCopy}>
          <Copy className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  );
}
