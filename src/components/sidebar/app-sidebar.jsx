import * as React from "react";
import {
  FileText,
  IdCard,
  CalendarDays,
  History,
  FileUser,
  Info,
  Book
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main";
import { NavStudent } from "@/components/sidebar/nav-student";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useAuthStore from "@/store/authStore";
import Logo from '@/assets/logo.png'

const data = {
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
    {
      title: "History",
      url: "#",
      icon: History,
      items: [
        {
          title: "Student ID Card",
          url: "/history-applications",
        },
        {
          title: "Good Moral Request",
          url: "/history-requests",
        },
      ],
    },
  ],
  others: [
    {
      name: "Calendar",
      url: "/Calendar",
      icon: CalendarDays,
    },
    {
      name: "About Us",
      url: "/about-us",
      icon: Info,
    },
    {
      name: "User Manual",
      url: "/user-manual",
      icon: Book,
    },
  ],
  student: [
    {
      name: "Student ID Card",
      url: "/student/id-card-application",
      icon: FileUser,
    },
    {
      name: "Good Moral",
      url: "/student/good-moral-request",
      icon: FileUser,
    },
    {
      name: "About Us",
      url: "/about-us",
      icon: Info,
    },
    {
      name: "User Manual",
      url: "/user-manual",
      icon: Book,
    },
  ],
};

export function AppSidebar({ ...props }) {

  const store = useAuthStore()
  const currentUser = store.currentUser
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
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={Logo} alt="cpsu" />
                    <AvatarFallback className="rounded-lg">CPSU</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Central Philippines State University</span>
                  <span className="truncate text-xs">CPSU OSSA APPOINTMENT SCHEDULER</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {currentUser && currentUser?.role === 'user' && (<NavStudent data={data.student} />)}
        {currentUser && currentUser?.role === 'admin' && (<NavMain data={data.main} />)}
        {currentUser && currentUser?.role === 'admin' && (<NavOthers data={data.others} />)}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
