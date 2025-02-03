"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TemplateSidebar } from "@/components/ui/app-sidebar";
import { useEffect, useState} from "react";
import {getTemplate} from "@/server/queries";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useSearchParams} from "next/navigation";

export default function Page() {



    const searchParams = useSearchParams();

    const templateId = searchParams.get("templateId");
    const[templateName,setTemplateName] = useState<string | undefined>(undefined);
    const [subject, setSubject] = useState<string | undefined>(undefined);
    const [body, setBody] = useState<string | undefined>(undefined);



    async function fetchTemplate() {
        if (!templateId) return;
        const response = await getTemplate(templateId);

        setTemplateName(response?.templateName);
        setSubject(response?.subject);
        setBody(response?.body);

    }

    useEffect(() => {
        fetchTemplate();
    }, [templateId]);

    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value);
    };




    return (
        <div className="flex justify-center items-center">
            <TemplateSidebar
                templateId={templateId!}
                templateName={templateName!}
                onTemplateNameChange={setTemplateName}
                subject={subject!}
                body={body!}
            />
            <Card className="flex flex-col w-[800px] rounded-lg overflow-hidden shadow-lg">
                <CardHeader className="flex flex-row items-center space-x-2 bg-neutral-800 px-4 py-2">
                    <div className="bg-red-500 h-3.5 w-3.5 mt-1.5 rounded-full flex-shrink-0"></div>
                    <div className="bg-yellow-400 h-3.5 w-3.5 rounded-full flex-shrink-0"></div>
                    <div className="bg-green-400 h-3.5 w-3.5 rounded-full flex-shrink-0"></div>
                    <div className="flex-grow"></div>
                    <p className="font-medium text-neutral-300">Email Template Preview</p>
                    <div className="flex-grow"></div>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex items-center space-x-2 px-4 py-4 border-b border-b-neutral-300 bg-neutral-100">
                        <Label className="text-neutral-500">subject:</Label>
                        <Input
                            value={subject}
                            onChange={handleSubjectChange}
                            type={"text"}
                            placeholder={"Enter Subject..."}
                            className="border-none placeholder:text-neutral-800 font-medium focus:outline-none shadow-none"
                        />
                    </div>
                    <div className="min-h-[300px] flex flex-col items-center  p-4 rounded-lg">
                        <div className="min-h-[300px] flex flex-col items-center p-4 rounded-lg">
                            <ReactQuill
                                theme="snow"
                                value={body || ""}
                                onChange={setBody}
                                placeholder="Enter email body..."
                                className="plus-jakarta-sans-body w-full min-h-[300px]"
                            />
                            <Button className="bg-neutral-800 hover:bg-neutral-700 w-[500px] h-12 bottom-4 mt-4">
                                Save Changes
                            </Button>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}