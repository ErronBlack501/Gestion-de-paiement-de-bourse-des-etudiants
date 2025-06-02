import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Bell, Languages, Menu, UserCircle, LogOut, Settings, HelpCircle, X } from "lucide-react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

const user = {
  name: "Admin User",
  email: "admin@example.com",
  avatar: "/default-avatar.svg"
};

type MenuItem = {
  label?: string;
  icon?: any;
  onClick?: () => void;
  separator?: boolean;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}

export function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const userMenuItems: MenuItem[] = [
    {
      label: "Profil",
      icon: UserCircle,
    },
    {
      label: "Paramètres",
      icon: Settings,
    },
    {
      label: "Aide",
      icon: HelpCircle,
    },
    {
      label: "Notifications",
      icon: Bell,
      mobileOnly: true,
    },
    {
      label: "Langue",
      icon: Languages,
      mobileOnly: true,
    },
    {
      separator: true,
    },
    {
      label: "Déconnexion",
      icon: LogOut,
    },
  ];

  // Menu items for mobile dropdown
  const mobileMenuItems = userMenuItems.filter(
    (item) => !item.desktopOnly
  );

  // Menu items for desktop user dropdown
  const desktopUserMenuItems = userMenuItems.filter(
    (item) => !item.mobileOnly
  );

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.separator) {
      return <DropdownMenuSeparator key={`separator-${index}`} />;
    }

    const Icon = item.icon;
    return (
      <DropdownMenuItem
        key={item.label}
        onClick={item.onClick}
        className="cursor-pointer"
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{item.label}</span>
        {item.label === "Notifications" && hasNotifications && (
          <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500" />
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <div className="border-border flex h-16 items-center justify-between border-b px-4 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle - Mobile */}
        <div className="sm:hidden">
          <SidebarTrigger />
        </div>

        {/* Search input */}
        <div className="relative hidden sm:block">
          <Input
            type="text"
            placeholder="Rechercher…"
            className="border-border w-64 rounded-lg border py-1.5 pr-10 pl-3 shadow-sm focus:ring-2 focus:outline-none"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Desktop Controls */}
        <div className="hidden items-center gap-2 sm:flex">
          <button className="hover:bg-accent hover:text-accent-foreground flex items-center gap-1 rounded-md p-2 transition-colors">
            <Languages className="h-5 w-5" />
            <span className="text-sm">FR</span>
          </button>
          <button
            className="hover:bg-accent hover:text-accent-foreground relative rounded-md p-2 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {/* Desktop User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-muted-foreground text-xs leading-none">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {desktopUserMenuItems.map((item, index) =>
                  renderMenuItem(item, index)
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="hover:bg-accent rounded-md p-2 transition-colors sm:hidden"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 z-50 h-full w-4/5 max-w-sm bg-white p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                className="rounded-md p-1 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1">
              {mobileMenuItems.map((item, index) =>
                renderMenuItem(item, index)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
