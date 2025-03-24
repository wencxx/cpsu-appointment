import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="p-10 min-h-[100vh]">
              <Outlet />
            </div>
            <footer className="w-full border-t bg-background py-6">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Created by Esparagoza Rozenie, Catalan Rowella, and
                      Porquillo Ivy
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Central Philippines State University
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Student Services and Affairs
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
