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
              {/* Static Breadcrumbs */}
              <Breadcrumb
                className="text-muted-foreground flex items-center text-sm"
                aria-label="Breadcrumb"
              >
                <BreadcrumbList className="flex items-center space-x-1">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="hover:underline">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>&#8250;</BreadcrumbSeparator>
                  <BreadcrumbEllipsis>...</BreadcrumbEllipsis>
                  <BreadcrumbSeparator>&#8250;</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="hover:underline">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
