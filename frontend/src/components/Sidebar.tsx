import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArchiveIcon,
  BookmarkIcon,
  HeartIcon,
  HighlighterIcon,
  HomeIcon,
  LogOutIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { PocketIcon } from "@/utils/icons";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProfileSection() {
  const { session, signOut } = useAuthStore();

  return (
    <div className="border-t border-border mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-4 h-auto hover:bg-accent"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UserIcon className="size-4 text-primary" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium text-sm truncate">
                  {session?.user?.name || "User"}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" side="right">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              to="/app/profile"
              className="flex items-center gap-2 cursor-pointer"
            >
              <UserIcon className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/app/sink"
              className="flex items-center gap-2 cursor-pointer"
            >
              <PaletteIcon className="size-4" />
              Appearance
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/app/sink"
              className="flex items-center gap-2 cursor-pointer"
            >
              <SettingsIcon className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={signOut}
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOutIcon className="size-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const searchParams = new URLSearchParams(router.location.search);
  const currentFilter = searchParams.get("filter") || "all";

  // Helper function to determine if a nav item is active
  const isActive = (path: string, filter?: string) => {
    if (filter) {
      return currentPath === "/app" && currentFilter === filter;
    }
    return currentPath === path;
  };

  const navItems = [
    {
      section: "Main",
      items: [
        {
          href: "/app",
          label: "My List",
          icon: HomeIcon,
          isActive: isActive("/app", "all"),
        },
        {
          href: "/saves", // You may need to create this route
          label: "All Saves",
          icon: BookmarkIcon,
          isActive: isActive("/saves"),
        },
      ],
    },
    {
      section: "Filters",
      items: [
        {
          href: "/app",
          search: { filter: "unread" },
          label: "Unread",
          icon: BookmarkIcon,
          isActive: isActive("/app", "unread"),
        },
        {
          href: "/app",
          search: { filter: "favorites" },
          label: "Favorites",
          icon: HeartIcon,
          isActive: isActive("/app", "favorites"),
        },
        {
          href: "/app",
          search: { filter: "archived" },
          label: "Archive",
          icon: ArchiveIcon,
          isActive: isActive("/app", "archived"),
        },
        {
          href: "/app",
          search: { filter: "highlights" },
          label: "Highlights",
          icon: HighlighterIcon,
          isActive: isActive("/app", "highlights"),
        },
      ],
    },
    {
      section: "Tools",
      items: [
        {
          href: "#",
          label: "Search",
          icon: SearchIcon,
          isActive: false,
          onClick: () => {
            // You can implement search functionality here
            console.log("Open search");
          },
        },
      ],
    },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link
          to="/app"
          className="flex items-center gap-3 font-extrabold text-xl hover:text-primary transition-colors"
        >
          <PocketIcon className="size-6 text-primary" />
          <span>PickPocket</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navItems.map((section) => (
          <div key={section.section} className="space-y-2">
            <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const LinkComponent = item.onClick ? "button" : Link;
                const linkProps = item.onClick
                  ? { onClick: item.onClick }
                  : {
                      to: item.href,
                      search: item.search,
                    };

                return (
                  <LinkComponent
                    key={item.label}
                    {...linkProps}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="size-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </LinkComponent>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile Section */}
      <ProfileSection />
    </aside>
  );
}
