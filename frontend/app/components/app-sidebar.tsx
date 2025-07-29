import * as React from "react";
import {
  ClockAlert,
  Coins,
  CreditCard,
  LayoutDashboardIcon,
  Users,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Link } from "react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Étudiants",
      url: "/admin/students",
      icon: Users,
    },
    {
      title: "Montants",
      url: "/admin/amounts",
      icon: Coins,
    },
    {
      title: "Paiements",
      url: "/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Retartadaires",
      url: "/admin/latecomers",
      icon: ClockAlert,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/admin" className="flex items-center gap-2">
                <img
                  src="/la-lettre-b.gif"
                  alt="Boursitra Logo"
                  className="h-auto w-full max-w-[32px] transition-all duration-300"
                />
                <span className="text-base font-semibold">Boursitra.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
