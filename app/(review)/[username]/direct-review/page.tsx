"use client"

import { useState,useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Star, Sparkles, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/app/lib/utils"
import {addTweet} from "@/server/queries";
import {useSession} from "@/app/lib/auth-client";

const emojis = [
    { emoji: "😠", label: "Angry", color: "from-red-500" },
    { emoji: "🙁", label: "Unhappy", color: "from-orange-500" },
    { emoji: "😐", label: "Neutral", color: "from-yellow-500" },
    { emoji: "😊", label: "Happy", color: "from-green-500" },
    { emoji: "😄", label: "Delighted", color: "from-emerald-500" },
]

export default function ReviewForm() {
    const session = useSession();
    const user = session.data?.user;
    const [step, setStep] = useState(0);
    const[mediaFile, setMediaFile] = useState<string | null>(null);
    const [rating, setRating] = useState<number | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        jobTitle: "",
        review: "",

    })

    useEffect(() => {
        const url = localStorage.getItem("uploadedFileUrl");
        setMediaFile(url);
        localStorage.removeItem("uploadedFileUrl");
    },[])

    async function handleSubmit() {
        if(user) {
            await addTweet({
               user,
                username : formData.name,
                handle : formData.jobTitle,
                tweetContent : formData.review,
                isVerified : false,
                userImage : imagePreview || "",
                mediaFiles : [mediaFile ?? ""] ,
                rating : rating || 0
            })
        }

    }


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const steps = [
        {
            title: "Make it personal",
            icon: <Upload className="w-6 h-6 " />,
        },
        {
            title: "Rate your experience",
            icon: <Star className="w-6 h-6" />,
        },
    ]

    return (
        <div className="min-h-screen w-screen  flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-3xl" />

                <div className="relative p-8 shadow-xl rounded-3xl">

                    <div className="flex justify-center mb-8">
                        {steps.map((s, i) => (
                            <div key={i} className="flex items-center">
                                <motion.div
                                    className={cn(
                                        "relative flex items-center justify-center w-12 h-12 rounded-full",
                                        step >= i ? "bg-primary text-white " : "bg-muted ",
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div initial={false} animate={step >= i ? { scale: [1, 1.2, 1] } : {}}>
                                        {s.icon}
                                    </motion.div>
                                    {step === i && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-primary/20"
                                            animate={{ scale: [1, 1.4, 1] }}
                                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                        />
                                    )}
                                </motion.div>
                                {i < steps.length - 1 && (
                                    <div className={cn("w-20 h-0.5 mx-2", step > i ? "bg-primary text-white" : "bg-muted")} />
                                )}
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold">Make it personal</h2>
                                    <p className="text-muted-foreground">Tell us about yourself</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Profile Picture</label>
                                        <div className="relative group">
                                            <div
                                                className={cn(
                                                    "w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden",
                                                    "group-hover:border-primary transition-colors",
                                                    imagePreview ? "border-primary" : "border-muted-foreground/25",
                                                )}
                                            >
                                                {imagePreview ? (
                                                    <motion.img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                    />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-24 h-24 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Input
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder="Job title"
                                                value={formData.jobTitle}
                                                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                                className="h-12"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold">Rate your experience</h2>
                                    <p className="text-muted-foreground">Share your thoughts with us</p>
                                </div>

                                <div className="flex justify-between items-center py-4">
                                    {emojis.map((item, index) => (
                                        <motion.button
                                            key={index}
                                            className={cn("relative flex flex-col items-center space-y-2", rating === index && "scale-110")}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setRating(index)}
                                        >
                                            <div className={cn("text-4xl transition-transform", rating === index && "transform scale-110")}>
                                                {item.emoji}
                                            </div>
                                            {rating === index && (
                                                <motion.div
                                                    className={cn("absolute -inset-2 rounded-full bg-gradient-to-t opacity-20", item.color)}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                <Textarea
                                    placeholder="Write something nice ✨"
                                    value={formData.review}
                                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                    className="min-h-[120px] resize-none"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="flex justify-between mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {step > 0 && (
                            <Button variant="ghost" onClick={() => setStep(step - 1)}>
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}
                        <Button
                            className="ml-auto"
                            onClick={() => {
                                if (step < steps.length - 1) {
                                    setStep(step + 1)
                                } else {

                                    handleSubmit()
                                }
                            }}
                        >
                            {step === steps.length - 1 ? (
                                <>
                                    Submit
                                    <Sparkles className="w-4 h-4 ml-2" />
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

