"use server";

import { client } from "@/app/lib/prisma";

import { redirect } from "next/navigation";

import { User } from "better-auth";
import {Templates} from "@prisma/client";
import {generateRandomString} from "@/app/lib/utils";
import {revalidatePath} from "next/cache";

export async function addTweet({
  user,
  username,
  handle,
                                 jobTitle,
  tweetContent,
  isVerified,
  userImage,
  mediaFiles,
    rating,
}: {
  user: User;
  username: string;
  handle: string;
  jobTitle? : string
  tweetContent: string;
  isVerified: boolean;
  userImage: string;
  mediaFiles?: string[];
  rating?: number;
}) {
  if (!user) {
    throw new Error("Unauthorized: User is required.");
  } else {
    await client.tweetReview.create({
      data: {
        profile: userImage,
        username: username,
        handle: handle,
        jobTitle: jobTitle,
        tweetContent: tweetContent,
        verified: isVerified,
        userId: user.id,
        id: JSON.stringify(Math.floor(Math.random() * 100000)),
        createdAt: new Date(),
        images: mediaFiles,
        rating: rating,
      },
    });

    redirect("/dashboard/reviews");
  }
}

export async function updateTweetStatus(id: string, status: string) {
  return await client.tweetReview.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
}

export async function deleteReview(id: string, userId: string | undefined) {
  await client.tweetReview.delete({
    where: {
      id: id,
    },
  });

  const updatedTweetInfo = await client.tweetReview.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (updatedTweetInfo) {
    return updatedTweetInfo;
  } else {
    return [];
  }
}

export async function getReviews(userId: string | undefined) {
  if (!userId) {
    console.error("Unauthorized");
  } else {
    const tweetsText = await client.tweetReview.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      tweetsText,
    };
  }
}



export  async function getTemplates(userId: string): Promise<Templates[]> {
  if (!userId) {
    throw  new Error("The user found,Unauthorized");
  }

  try {
    const response = await client.templates.findMany({
      where: { userId }
    });

    return response;
  } catch(err) {
    console.error(err);
    throw new Error("An error occurred while fetching the templates")
  }
}

export async function updateTemplate(
    templateId: string | null,
    name : string | null,
    subject: string | null,
    content: string | null,
    userId: string | undefined,
    senderName : string,
    replyEmail :string
) {


  if (!userId) {
    return {
      status: "error",
      message: "You don't have permission to update this page",
    };
  }

  if (!templateId) {
    return {
      status: "error",
      message: "There is no template to update",
    };
  }

  try {

    const currentUser = await client.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      return {
        status: "error",
        message: "User not found or unauthorized",
      };
    }


    const updatedTemplate = await client.templates.update({
      where: {
        id: templateId,
        userId: currentUser.id, // Ensure template belongs to the user
      },
      data: {
        templateName: name!,
        subject : subject!,
        body: content!,
        sendersName: senderName!,
        replyToEmail: replyEmail!,
      },
    });

    return {
      status: "success",
      message: "Template updated successfully",
      template: updatedTemplate,
    };
  } catch (error) {
    console.error("Error updating template:",  error);
    return {
      status: "error",
      message: "An error occurred while updating the template",
    };
  }
}

export async  function getTemplate(templateId: string) : Promise<Templates | null>{
  if (!templateId) {
    throw new Error("Template ID is required");
  }

  try {
    const template = await client.templates.findUnique({
      where: { id: templateId },
    })

    if(!template){
      console.warn(`No template found for ID: ${templateId}`);
    }

    return template;
  }catch(err) {
    console.error(err);
    throw new Error("An error occurred while fetching the template");
  }
}

export async function createTemplate(userId :string){
  if (!userId) {
    throw new Error("User ID is required for template creation.");
  }

  try {
    const  response = await client.templates.create({
      data : {
        id : generateRandomString(),
        sendersName : "",
        replyToEmail : "",
        subject : "",
        body : "",
        userId : userId,
        placeholders : ["user_name","date"],
      }
    })
    revalidatePath(`/dashboard/invite`)

    return response;

  }catch(err) {
    console.error(err);
    throw new Error("An error occurred while creating the template");
  }

}

export async function deleteTemplate(userId :string,templateId:string){
  if (!userId) {
    throw new Error("Unauthorized for template Deletion")
  }

  if (!templateId){
    throw new Error("Template ID is required");
  }

  try {
    await client.templates.delete({
      where : {
        id : templateId,
        userId : userId,
      }
    })



  }catch(err) {
    console.error(err);
    throw new Error("An error occurred while deleteing the template");
  }
}