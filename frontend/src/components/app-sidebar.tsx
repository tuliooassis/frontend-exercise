import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import React from "react";
import { Categories } from "./Categories";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="gap-0 bg-white">
        <SidebarGroupLabel
          className={
            "bg-primary text-primary-foreground justify-center rounded-none	h-16 text-md lg:text-sm"
          }
        >
          Posts
        </SidebarGroupLabel>
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupContent>
            <SidebarMenu>
              <Categories />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
