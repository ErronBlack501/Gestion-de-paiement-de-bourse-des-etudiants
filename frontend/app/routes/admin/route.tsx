import { SidebarProvider } from "~/components/ui/sidebar";
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
            <div className="px-3 pt-3">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
