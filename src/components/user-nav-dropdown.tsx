"use client";

import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  LayoutDashboard,
  LogOut,
  Ticket,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type UserNavDropdownProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function UserNavDropdown({
  user,
}: UserNavDropdownProps) {
  const router = useRouter();
// console.log("profile image",user.image);
  const userName = user.name || "User";
  const userEmail = user.email || "";
  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      {/* Profile Avatar */}
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open user menu"
            className="h-11 w-11 rounded-full border border-green-900/10 p-0 dark:border-white/10"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.image || undefined}
                alt={userName}
              />

              <AvatarFallback className="bg-[#176B40] font-semibold text-white">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />

      {/* Dropdown Content */}
<DropdownMenuContent align="end" className="w-64">
  <DropdownMenuGroup>
    <DropdownMenuLabel className="font-normal">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.image || undefined}
            alt={userName}
          />
          <AvatarFallback>
            {userInitial}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold">
            {userName}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {userEmail}
          </span>
        </div>
      </div>
    </DropdownMenuLabel>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuGroup>
    <DropdownMenuItem render={<Link href="/create-event" />}>
      <CalendarPlus />
      Create Event
    </DropdownMenuItem>

    <DropdownMenuItem render={<Link href="/joined-events" />}>
      <Ticket />
      Joined Events
    </DropdownMenuItem>

    <DropdownMenuItem render={<Link href="/manage-events" />}>
      <LayoutDashboard />
      Manage Events
    </DropdownMenuItem>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  <DropdownMenuItem onClick={handleLogout}>
    <LogOut />
    Logout
  </DropdownMenuItem>
</DropdownMenuContent>
    </DropdownMenu>
  );
}