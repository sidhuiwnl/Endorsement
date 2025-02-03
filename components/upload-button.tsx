"use client";

import {UploadButton} from "@/utils/uploadthing";
import { toast } from "sonner";

export default function CustomUploadButton() {
    return (
        <UploadButton
            endpoint="imageUploader"
            className="bg-neutral-800 text-white rounded-lg"
            onClientUploadComplete={(res) => {
                toast.success("File uploaded successfully.");
                console.log(res);
                localStorage.setItem("uploadedFileUrl", res[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(error.message);
            }}
        />
    );
}