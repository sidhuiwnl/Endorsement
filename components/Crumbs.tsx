"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbComp() {
  const pathname = usePathname();
  const pathsegments = pathname.split("/").filter((segment) => segment);
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className=" border-b border-gray-200">
      <Breadcrumb className="p-6 ">
        <BreadcrumbList className="flex items-center ">
          {pathsegments.map((pathsegment, index) => {
            const href = "/" + pathsegments.slice(0, index + 1).join("/");

            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href={href} className="font-medium text-sm">
                    {capitalize(decodeURIComponent(pathsegment))}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathsegments.length - 1 && (
                  <BreadcrumbSeparator className="mx-2 text-gray-500" />
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
