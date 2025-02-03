"use client"

import BreadcrumbComp from "@/components/Crumbs";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showSidebar = !pathname.startsWith("/dashboard/invite/template/");

    return (
        <div className="flex w-full h-screen">
            <SidebarProvider>
                {showSidebar && <AppSidebar />}
                <div className="flex-1 flex flex-col">
                    {showSidebar && (
                        <div className="sticky top-0 z-10">
                            <BreadcrumbComp />
                        </div>
                    )}
                    <div className={`flex-1  overflow-auto ${showSidebar ? 'p-6' : 'p-0'}`}>
                        {children}
                    </div>
                </div>
            </SidebarProvider>

        </div>
    );
}