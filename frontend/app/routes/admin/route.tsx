import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from "react-router";
import { Topbar } from "~/components/topbar";
import { Toaster } from "sonner";
export default function AdminLayout() {
  return (
    <SidebarProvider className="px-1 py-2">
      <div className="flex min-h-screen w-full">
        <AppSidebar className="border-none" />
        <div className="bg-background text-foreground flex flex-1 flex-col rounded-lg shadow-lg">
          <Topbar />
          <main className="flex-1">
            <div className="px-3 pt-3">
              <Outlet />
            </div>
          </main>
          <Toaster richColors />
        </div>
      </div>
    </SidebarProvider>
  );
}
