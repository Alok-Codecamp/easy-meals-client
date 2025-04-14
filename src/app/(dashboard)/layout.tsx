import { ReactNode } from "react";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar/AppSidebar";





const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout;