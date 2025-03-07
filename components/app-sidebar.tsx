"use client";

import {
  Home,
  Youtube,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  ArrowUpCircle,
  Bell,
  CreditCard,
  User,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const JaemiLogo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Platform navigation items
const platformItems = [
  {
    title: "Learning",
    icon: Home,
    href: "/study",
  },
  {
    title: "Youtube",
    icon: Youtube,
    href: "/youtube",
  },
  {
    title: "TOPIC",
    icon: FileText,
    href: "/topic",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen, toggleSidebar } = useSidebar();

  const handleSignOut = () => {
    // Here you would typically handle the sign out logic
    router.push("/");
  };

  return (
    <div
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "60px",
        } as React.CSSProperties
      }
      className="flex relative"
    >
      <Sidebar
        className="border-r border-border bg-sidebar transition-all duration-300 ease-in-out"
        collapsible="none"
        style={{
          width: open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)",
          minWidth: open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)",
        }}
      >
        <SidebarHeader
          className={cn(
            "flex transition-all duration-300 ease-in-out",
            open ? "justify-between px-5 py-3" : "justify-center py-3"
          )}
        >
          {open ? (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <JaemiLogo />
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-sm font-semibold">HanJaemi</h1>
                <p className="text-xs text-muted-foreground">Learning Korean</p>
              </div>
            </Link>
          ) : (
            <Link href="/" className="flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                <JaemiLogo />
              </div>
            </Link>
          )}
        </SidebarHeader>

        <SidebarContent
          className={cn(
            "transition-all duration-300 ease-in-out",
            open ? "px-2" : ""
          )}
        >
          <SidebarGroup>
            {open && (
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                Platform
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              {open ? (
                <SidebarMenu>
                  {platformItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        title={item.title}
                        className={cn(
                          "transition-all duration-300 ease-in-out h-9 justify-start gap-2 px-3",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        )}
                      >
                        <Link href={item.href} className="flex items-center">
                          <item.icon className="shrink-0 h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ) : (
                <div className="flex flex-col items-center gap-3 py-3">
                  {platformItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-md transition-all duration-300 ease-in-out",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>

          {open && (
            <SidebarGroup className="pt-3">
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">
                History
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="h-9 justify-start gap-2 px-3 hover:bg-accent/50"
                    >
                      <Link href="#">
                        <div className="grid place-items-center h-4 w-4">
                          YT
                        </div>
                        <span>
                          모델과가 알려주는 인생샷 찍는 법 [서경대 모델연기전공]
                          | 전과자 ep.74 [EN]
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="mt-auto">
          {open ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-3 h-auto rounded-none border-t"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="user"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm">Choi Vadim</span>
                      <span className="text-xs text-muted-foreground">
                        tsoivadim97@gmail.com
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="right"
                className="w-56 ml-1"
                sideOffset={0}
              >
                <DropdownMenuItem className="flex gap-2 items-center">
                  <ArrowUpCircle className="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 items-center">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex gap-2 items-center"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="py-3 flex justify-center cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="user"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        SC
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side="right"
                  className="w-56 ml-1"
                  sideOffset={0}
                >
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <ArrowUpCircle className="h-4 w-4" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex gap-2 items-center"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Toggle button positioned to the right of the sidebar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute top-4 h-6 w-6 rounded-full bg-background border shadow-sm z-50 transition-all duration-300"
        style={{
          left: open ? "calc(var(--sidebar-width) - 12px)" : "46px",
        }}
      >
        {open ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
