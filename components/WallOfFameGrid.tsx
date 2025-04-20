import {Avatar, AvatarImage} from "@/components/ui/avatar";


export default function WallOfFameGrid({
    className,
    title,
    description,
    imageUrl,
    userImage,
    handle,
                                       }: {
    className: string;
    title: string;
    imageUrl: string;
    description: string;
    userImage: string;
    handle: string;
}){
    return(
        <div className={`border rounded-xl p-4 mt-5 bg-gray-50 w-full flex flex-col  gap-3 ${className}`}>
        <p className="text-sm font-medium">
                {description}
        </p>
            <img
                className="object-contain rounded-lg"
                src={imageUrl} />

            <div className="flex flex-row items-center gap-2">
                <Avatar>
                    <AvatarImage src={userImage} />
                </Avatar>
                <div className="flex flex-col  ml-2">
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-sm">@{handle}</p>
                </div>

            </div>

        </div>
    )
}