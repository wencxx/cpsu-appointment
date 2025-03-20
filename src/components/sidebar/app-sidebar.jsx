import * as React from "react";
import {
  FileText,
  Command,
  IdCard,
  CalendarDays,
  History
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main";
import { NavOthers } from "@/components/sidebar/nav-others";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Rozenie Esparagoza",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      title: "Student ID Card",
      url: "#",
      icon: IdCard,
      isActive: true,
      items: [
        {
          title: "Approve Applications",
          url: "/",
        },
        {
          title: "Pending Applications",
          url: "/pending-applications",
        },
      ],
    },
    {
      title: "Good Moral Certificates",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Approve Requests",
          url: "/approve-requests",
        },
        {
          title: "Pending Requests",
          url: "/pending-requests",
        },
      ],
    },
  ],
  others: [
    {
      name: "Calendar",
      url: "#",
      icon: CalendarDays,
    },
    {
      name: "History",
      url: "#",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={data.main} />
        <NavOthers data={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
