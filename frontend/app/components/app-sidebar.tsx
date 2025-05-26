import * as React from "react";
import {
  ClockAlert,
  Coins,
  CreditCard,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  Users,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      title: "Montant",
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
      url: "/admin/delayed",
      icon: ClockAlert,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Obtenir de l'aide",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-card-foreground">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
