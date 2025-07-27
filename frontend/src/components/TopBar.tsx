import { MenuIcon, PocketIcon, ProfileIcon } from "@/utils/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
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
import { useAuthStore } from "@/stores/authStore";

function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-8" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link
              className="flex items-center gap-2 font-extrabold text-2xl ml-7 mt-8"
              to="/app"
            >
              <PocketIcon className="size-6" />
              PickPocket
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="ml-8 flex flex-col gap-2">
          {/* Main Navigation */}
          <Link
            to="/app"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <HomeIcon className="size-5" />
            <span>My List</span>
          </Link>

          <Link
            to="/saves"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
          >
            <BookmarkIcon className="size-5" />
            <span>All Saves</span>
          </Link>

          {/* Filter Links */}
          <div className="mt-4">
            <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Filters
            </h3>

            <Link
              to="/app"
              search={{ filter: "favorites" }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <HeartIcon className="size-5" />
              <span>Favorites</span>
            </Link>

            <Link
              to="/app"
              search={{ filter: "archived" }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <ArchiveIcon className="size-5" />
              <span>Archive</span>
            </Link>

            <Link
              to="/app"
              search={{ filter: "highlights" }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <HighlighterIcon className="size-5" />
              <span>Highlights</span>
            </Link>
          </div>

          {/* Tools */}
          <div className="mt-4">
            <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Tools
            </h3>

            <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors w-full text-left">
              <SearchIcon className="size-5" />
              <span>Search</span>
            </button>

            <Link
              to="/app/sink"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <SettingsIcon className="size-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProfileMenu() {
  const { session, signOut } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileIcon className="size-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-56" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserIcon className="size-4" />
          {session?.user?.name || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Profile Management */}
        <DropdownMenuItem asChild>
          <Link
            to="/app/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <UserIcon className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        {/* Appearance Settings */}
        <DropdownMenuItem asChild>
          <Link
            to="/app/sink"
            className="flex items-center gap-2 cursor-pointer"
          >
            <PaletteIcon className="size-4" />
            Appearance
          </Link>
        </DropdownMenuItem>

        {/* General Settings */}
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

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOutIcon className="size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopBar() {
  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between text-2xl py-4 px-6 items-center bg-background/95 backdrop-blur-sm border-b border-border">
      <HamburgerMenu />
      <Link className="flex items-center gap-2 font-extrabold" to="/app">
        <PocketIcon className="size-6" />
        PickPocket
      </Link>
      <ProfileMenu />
    </nav>
  );
}
