import { SidebarProvider } from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "~/components/ui/breadcrumb";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from "react-router";
import { Topbar } from "~/components/topbar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="bg-background text-foreground flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1">
            <div className="px-6 pt-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
