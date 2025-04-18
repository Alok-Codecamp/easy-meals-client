"use client";
import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "../dashboard/team-switcher";
import { NavMain } from "../dashboard/nav-main";
import { NavProjects } from "../dashboard/nav-projects";
import { NavUser } from "../dashboard/nav-user";
import { DecodedUser } from "@/types/auth.types";
import { GiMeal } from "react-icons/gi";
import { CustomerNavMenuItem, NavMenuItem, providerNavMenuItem } from "./constants/sidebarMenuItems";
import { TNavMain } from "@/types/nav.types";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const data = {
    teams: [
        {
            name: "Easy Meals",
            logo: GiMeal,
            plan: "Build your meal plan",
        },
    ],
};

export function AppSidebar({
    user,
    ...props
}: { user: DecodedUser | null } & React.ComponentProps<typeof Sidebar>) {
    const navMain: NavMenuItem[] = [];
    // logic for user dashboard sidebar menu item 
    if (user?.role === "customer") {
        CustomerNavMenuItem.map((item) => navMain.push(item as NavMenuItem));
    }
    // logic for provider dashboard sidebar menu item 
    if (user?.role === "mealProvider") {
        providerNavMenuItem.map((item) => navMain.push(item as NavMenuItem));
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={200}
                        height={0}
                        sizes="100vw"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
