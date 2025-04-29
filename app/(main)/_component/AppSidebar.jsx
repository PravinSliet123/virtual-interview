"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "All Interview",
    url: "/all-interview",
    icon: Inbox,
  },
];

export function AppSidebar() {
    const  pathname = usePathname() 
    
  return (
    <Sidebar  >
      <SidebarContent >
        <SidebarGroup>
          {/* <SidebarGroupLabel> */}
            <Image src={'/Interview.png'} height={80} className=" mix-blend-multiply mx-auto " width={80} />
          {/* </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu >
             <Link href={"/create-interview"}> <Button className={"w-full my-4 cursor-pointer"}>Create New Interview</Button></Link>
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className={` ${pathname === item.url ?" bg-gray-100 ":""} rounded-md py-1.5 `} asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
