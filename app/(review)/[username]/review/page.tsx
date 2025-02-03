"use client"

import { useState } from "react"
import { Camera, Pencil, Upload, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
    DrawerHeader,
    DrawerDescription, DrawerClose
} from "@/components/ui/drawer";

import {useSession} from "@/app/lib/auth-client";
import Link from "next/link";
import CustomUploadButton from "@/components/upload-button";



export default function ReviewForm() {
    const session = useSession()
    const username = session?.data?.user.name.replace(/\s/g, "").toLowerCase();

    const [dragActive, setDragActive] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleDrag = (e: React.DragEvent) => {

        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const simulateUpload = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 2
            })
        }, 50)
    }

    return (
        <div className="w-screen min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-4xl shadow-xl rounded-3xl">
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-3xl" />

                <div className="relative p-8 md:p-12">
                    <motion.div
                        className="flex flex-col items-center text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="relative mb-6"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles className="w-12 h-12 text-primary" />
                            <div className="absolute inset-0 blur-2xl bg-primary/20 scale-150" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                            Share Your Story
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Hey there 👋 Your experience matters! Help others by sharing your honest thoughts and creative feedback.
                        </p>
                    </motion.div>

                    <motion.div
                        className={`
              relative rounded-2xl border-2 border-dashed p-12
              transition-all duration-300 ease-in-out
              ${dragActive ? "border-primary scale-[1.02] bg-primary/5" : "border-muted-foreground/25"}
            `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => {

                            handleDrag(e)
                            simulateUpload()
                        }}

                        whileHover={{ scale: 1.01 }}
                        animate={{ borderColor: dragActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                    >
                        <AnimatePresence>
                            {uploadProgress > 0 && (
                                <motion.div
                                    className="absolute inset-0 bg-primary/5 rounded-2xl overflow-hidden"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    exit={{ width: "0%" }}
                                    transition={{ duration: 0.5 }}
                                />
                            )}
                        </AnimatePresence>

                        <div className="relative flex flex-col items-center">
                            <motion.div
                                className="mb-6 relative"
                                animate={{
                                    y: dragActive ? [-10, 0] : 0,
                                }}
                                transition={{ repeat: dragActive ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
                            >
                                <div className="absolute inset-0 blur-2xl bg-primary/20 scale-150" />
                                <Upload className="h-16 w-16 text-primary relative" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-center"
                            >
                                <p className="text-xl font-semibold mb-2">Drop your creativity here</p>
                                <p className="text-sm text-muted-foreground mb-6">Share photos or videos that tell your story</p>
                                <div className="flex flex-wrap gap-2 justify-center mb-4">
                                    {["JPG", "PNG", "MP4", "MOV"].map((format) => (
                                        <span key={format} className="px-2 py-1 rounded-md bg-muted/50 text-xs font-medium">
                      {format}
                    </span>
                                    ))}
                                </div>
                                {/*<Button variant="secondary" className="relative group">*/}
                                {/*    <ImageIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />*/}
                                {/*    Choose Files*/}
                                {/*    */}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"*/}
                                {/*        accept="image/*,video/*"*/}
                                {/*        onChange={() => {*/}

                                {/*        }}*/}
                                {/*    />*/}
                                {/*</Button>*/}
                                <CustomUploadButton/>

                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Drawer>
                                <DrawerTrigger  className="w-[350px] flex justify-center items-center h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:to-primary">
                                        <Camera className="mr-2 h-5 w-5 text-white" />
                                        <span className="text-white">Record Video Review</span>

                                </DrawerTrigger>
                                <DrawerContent className="flex flex-col items-center">
                                    <DrawerHeader>
                                        <DrawerTitle className="text-5xl mb-2 ">Record a Video</DrawerTitle>
                                        <DrawerDescription>Scan The QR-Code to record a video with your phone :)</DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerClose >
                                        <Button className="w-[400px]" variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerContent>
                            </Drawer>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href={`/${username}/direct-review`}>
                                <Button
                                    variant="outline"
                                    className="w-full h-14 text-lg rounded-xl border-2 group hover:border-primary/50"
                                    size="lg"
                                >
                                    <Pencil className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                                    Write Review
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

