import { useEffect, useState } from "react";
import Link from "next/link";

import { Calendar, PencilLine, ChevronDown, Trash2, Send, Code } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { getTemplates,deleteTemplate }from "@/server/queries";
import { Templates } from "@prisma/client";
import CreateTemplate from "@/components/CreateTemplate";
import { toast } from "sonner"

export default function EmailTemplate({ userId }: { userId: string }) {

    const [templates, setTemplates] = useState<Templates[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function templateData() {
        try {
            setIsLoading(true);
            const fetchedTemplates = await getTemplates(userId!);
            setTemplates(fetchedTemplates);
        } catch (error) {
            console.error("Failed to fetch templates:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deletingTemplate(templateId: string,userId: string) {
        setIsLoading(true);
        const filteredTemplates = templates.filter( template => template.id !== templateId)
        setTemplates(filteredTemplates);
        setIsLoading(false);
        toast.success("Template deleted successfully.");

        await deleteTemplate(userId,templateId);

    }

    useEffect(() => {
        templateData();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 animate-pulse">
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-zinc-200 rounded-lg h-[290px]"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {templates.map((template) => (
                <div key={template.id} className="group">
                    <Card className="
                        w-full
                        max-w-[350px]
                        mx-auto
                        min-h-[290px]
                        border-zinc-200
                        shadow-md
                        hover:shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        group
                    ">
                        <Link
                            href={{
                                pathname: `/dashboard/invite/template/${template.id}`,
                                query: { name: template.templateName, templateId: template.id }
                            }}
                        >
                            <CardHeader className="pb-2">
                                <h1 className="
                                    font-bold
                                    text-xl
                                    text-zinc-900
                                    truncate
                                    group-hover:text-zinc-700
                                    transition-colors
                                ">
                                    {template.templateName}
                                </h1>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-4 p-4">
                                <div className="text-sm flex items-center space-x-2 text-zinc-600">
                                    <Calendar className="w-4 h-4 text-zinc-500" />
                                    <span>
                                        {new Date(template.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm flex items-center space-x-2 text-zinc-500">
                                    <PencilLine className="w-4 h-4 text-zinc-500" />
                                    <span>
                                        {template.placeholders.length} Placeholders
                                    </span>
                                </p>
                                <hr className="border-zinc-200" />
                                <Button
                                    className="
                                        w-full
                                        h-10
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        bg-zinc-800
                                        text-white
                                        hover:bg-zinc-700
                                        transition-colors

                                    "
                                >
                                    <PencilLine className="w-4 h-4" />
                                    Edit Template
                                </Button>
                            </CardContent>
                        </Link>
                        <CardContent className="flex flex-col space-y-2 p-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="
                                            w-full
                                            h-10
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            bg-zinc-100
                                            text-zinc-800
                                            hover:bg-zinc-200
                                            transition-colors
                                        "
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                        Actions
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[200px]">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Send className="mr-2 h-4 w-4" />
                                            Send
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Code className="mr-2 h-4 w-4" />
                                            Send via SDK
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            onClick={() => deletingTemplate(template.id,template.userId)}
                                            className="cursor-pointer text-red-600 focus:text-red-700">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                </div>
            ))}
            <CreateTemplate userId={userId} />
        </div>
    );
}