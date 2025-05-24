import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Bell, Languages, Settings, Menu } from "lucide-react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="border-border relative flex h-16 flex-wrap items-center gap-2 border-b px-4 shadow-sm">
      {/* Sidebar Toggle */}
      <SidebarTrigger />

      {/* Search input */}
      <div className="flex min-w-[120px] flex-1 items-end gap-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher…"
            className="border-border w-auto rounded-lg border py-1.5 pr-10 pl-3 shadow-sm focus:ring-2 focus:outline-none"
          />
          <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xs">
            ⌘K
          </span>
        </div>
      </div>

      {/* Desktop Controls */}
      <div className="ml-4 hidden items-center gap-4 sm:flex">
        <button className="hover:bg-accent hover:text-accent-foreground flex items-center gap-1 rounded px-2 py-1 transition-colors">
          <Languages className="h-5 w-5" />
          <span className="text-sm">FR</span>
        </button>
        <button
          className="hover:bg-accent hover:text-accent-foreground rounded p-2 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          className="hover:bg-accent hover:text-accent-foreground rounded p-2 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
        <Avatar>
          <AvatarImage src="/default-avatar.svg" alt="Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="hover:bg-accent ml-2 rounded p-2 transition-colors sm:hidden"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen((v) => !v)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 z-50 sm:hidden">
          <DropdownMenu open onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sr-only">
                Open Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="w-56 rounded-md border bg-white shadow-lg"
            >
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/default-avatar.svg" alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-foreground text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 pl-3.5">
                <Languages className="h-5 w-5" />
                <span className="text-sm">EN</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 pl-3.5">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 pl-3.5">
                <Settings className="h-5 w-5" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
