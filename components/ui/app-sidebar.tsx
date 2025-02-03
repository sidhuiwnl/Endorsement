"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  BeerIcon, ArrowLeft,
    Mail,
    LayoutIcon
} from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Image from "next/image";
import SignOut from "../Signout";

import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {updateTemplate} from "@/server/queries";
import {useState} from "react";
import { Input } from "@/components/ui/input";


const items = [
  {
    title: "Import Review",
    url: "/dashboard/import",
    icon: Home,
  },
  {
    title: "My Reviews",
    url: "/dashboard/reviews",
    icon: Inbox,
  },
  {
    title: "Wall of Fame",
    url: "/dashboard/walloffame",
    icon: Calendar,
  },
  {
    title: "Api Key",
    url: "/dashboard/api",
    icon: Search,
  },
  {
    title: "Automated Emails",
    url: "/dashboard/invite",
    icon: Mail,
  },
  {
    title: "Templates",
    url: "/dashboard/form",
    icon: LayoutIcon,
  },
];



export function AppSidebar() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="underline text-black mt-2 mb-3">
            <BeerIcon className="mr-2 " />
            Testimonial
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu className="flex flex-col space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-medium text-neutral-800">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Image
                    src={user?.image || ""}
                    width={30}
                    height={30}
                    alt={user?.name || ""}
                    className="rounded-full "
                  />
                  {user?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


export function TemplateSidebar({
    templateId,templateName,subject,body,onTemplateNameChange,
                                } : {
  templateId : string ,
  templateName : string ,
  subject: string ,
  body : string ,
  onTemplateNameChange : (name : string) => void ,
}){

  const[senderName,setSenderName]=useState("");
  const[replyEmail,setReplyEmail]=useState("");
  const session = useSession();
  const user = session.data?.user;



  return(
      <Sidebar >
        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupLabel className="underline  text-black  mb-3">
              <BeerIcon className="mr-2 " />
              Testimonial
            </SidebarGroupLabel>
            <Link
                href="/dashboard/invite"
                className="text-sm flex items-center space-x-2 mt-5"
            >
              <ArrowLeft width={20} height={20} />
              <span className="font-medium">Back</span>
            </Link>
            <SidebarGroupContent className="mt-20">

              <SidebarMenu className="flex items-center space-y-6">
                <div className="flex flex-col space-y-2">
                  <Label>Template Name</Label>
                  <Input
                      type="text"
                      value={templateName}
                      placeholder="Template name"
                      className="h-10"
                      onChange={e => onTemplateNameChange(e.target.value)}
                  />
                  <p className="text-sm text-gray-500"></p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label>Sender Name</Label>
                  <Input
                      value={senderName}
                      type="text"
                      placeholder="Sidharth"
                      className="h-10"
                      onChange={e => setSenderName(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">How you&apos;ll appear in the recipient&apos;s inbox</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label>Reply-to email</Label>
                  <Input
                      value={replyEmail}
                      type="email"
                      placeholder="reply@email.com"
                      className="h-10"
                      onChange={e => setReplyEmail(e.target.value)}
                  />
                  <p className="text-sm text-gray-500"></p>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mb-10">
          <Button
              onClick={async () => {
                await updateTemplate(templateId, templateName, subject, body, user?.id,senderName,replyEmail)
              }}
          >Save Template</Button>
        </SidebarFooter>
      </Sidebar>
  )
}
