import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {createTemplate} from "@/server/queries";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Templates} from "@prisma/client";
import { toast } from "sonner"

export default function CreateTemplate({
    userId,
                                       } : {
    userId: string;
}){

    const router = useRouter();
    const[loading, setLoading] = useState(false);
    const[response,setResponse] = useState<Templates | null>();

   if(response){
       router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/invite/template/${response.id}`);
   }

    return (
        <Card className=" max-w-[350px]  mx-auto min-h-[290px] flex flex-col items-center justify-center p-8 text-center">
            <CardContent>
                <p className="text-black mb-6">
                    Create your first email template to get started
                </p>
                <Button
                    onClick={async () =>{
                        setLoading(true);
                        toast.info("Creating Template");
                        const newTemplate = await createTemplate(userId);
                        setLoading(false);
                        setResponse(newTemplate);
                }}
                    className="w-full h-10 bg-zinc-800 text-white hover:bg-zinc-700">
                    { loading ? "Loading..." : "Create Template"}
                </Button>
            </CardContent>
        </Card>
    )
}