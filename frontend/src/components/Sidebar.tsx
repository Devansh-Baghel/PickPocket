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
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { FaSink as SinkIcon } from "react-icons/fa6";
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
import { useSidebar } from "@/stores/sidebarStore";

function ProfileSection({ isCollapsed }: { isCollapsed: boolean }) {
  const { session, signOut } = useAuthStore();

  if (isCollapsed) {
    return (
      <div className="mt-auto border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-center px-3 py-4 hover:bg-accent"
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="size-4 text-primary" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="right">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                to="/app/profile"
                className="flex cursor-pointer items-center gap-2"
              >
                <UserIcon className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to="/app/sink"
                className="flex cursor-pointer items-center gap-2"
              >
                <PaletteIcon className="size-4" />
                Appearance
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to="/app/sink"
                className="flex cursor-pointer items-center gap-2"
              >
                <SettingsIcon className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={signOut}
              className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
            >
              <LogOutIcon className="size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="mt-auto border-t border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-full justify-start px-3 py-4 hover:bg-accent"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="size-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="truncate text-sm font-medium">
                  {session?.user?.name || "User"}
                </div>
                <div className="truncate text-xs text-muted-foreground">
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
              className="flex cursor-pointer items-center gap-2"
            >
              <UserIcon className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/app/sink"
              className="flex cursor-pointer items-center gap-2"
            >
              <PaletteIcon className="size-4" />
              Appearance
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="/app/sink"
              className="flex cursor-pointer items-center gap-2"
            >
              <SettingsIcon className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={signOut}
            className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
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
  const isCollapsed = useSidebar((s) => s.isCollapsed);
  const toggle = useSidebar((s) => s.toggle);
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
          href: "/app",
          label: "All Saves",
          icon: BookmarkIcon,
          isActive: isActive("/saves"),
        },
        {
          href: "/app/sink",
          label: "UI Sink",
          icon: SinkIcon,
          isActive: isActive("/app/sink"),
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
            console.log("Open search");
          },
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 hidden h-screen flex-col border-r border-border bg-card transition-all duration-300 md:flex ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className={`border-b border-border ${isCollapsed ? "p-3" : "p-6"}`}>
        {isCollapsed ? (
          <div className="flex justify-center">
            <PocketIcon className="size-6 text-primary" />
          </div>
        ) : (
          <Link
            to="/app"
            className="flex items-center gap-3 text-xl font-extrabold transition-colors hover:text-primary"
          >
            <PocketIcon className="size-6 text-primary" />
            <span>PickPocket</span>
          </Link>
        )}
      </div>

      {/* Collapse Button */}
      <div
        className={`border-b border-border ${isCollapsed ? "p-2" : "px-4 py-2"}`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className={`${isCollapsed ? "w-full justify-center" : "w-full justify-start"} hover:bg-accent`}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="size-4" />
          ) : (
            <>
              <ChevronLeftIcon className="size-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto ${isCollapsed ? "p-2" : "p-4"} space-y-6`}
      >
        {navItems.map((section) => (
          <div key={section.section} className="space-y-2">
            {!isCollapsed && (
              <h3 className="px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {section.section}
              </h3>
            )}
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
                    className={`flex w-full items-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      isCollapsed
                        ? "justify-center px-3 py-3"
                        : "gap-3 px-3 py-2"
                    } ${
                      item.isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="size-4 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </LinkComponent>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Profile Section */}
      <ProfileSection isCollapsed={isCollapsed} />
    </aside>
  );
}
