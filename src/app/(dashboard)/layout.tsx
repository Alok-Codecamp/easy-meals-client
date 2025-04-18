"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useAppSelector } from "@/redux/hooks"
import { DecodedUser } from "@/types/auth.types"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;

    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1>NavBar</h1>
                    </div>
                </header>


                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                    {children}
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}
