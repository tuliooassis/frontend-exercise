import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { CategoryButton } from "./category-button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import React from "react";
import { CategoryType, useFeedProvider } from "@/hooks/use-feed";

function Categories() {
  const { categories, categoryType, setCategoryType, selectedCategory } =
    useFeedProvider();

  return (
    <div className="flex flex-col gap-12">
      <RadioGroup
        defaultValue={categoryType}
        onValueChange={setCategoryType}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={CategoryType.All}
            id={CategoryType.All}
            className="border border-accent shadow-none w-5 h-5"
          />
          <Label
            htmlFor={CategoryType.All}
            className="font-inter font-normal text-sm lg:text-xs leading-5 text-left underline-none"
          >
            All categories
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={CategoryType.Favorite}
            id={CategoryType.Favorite}
            className="border border-accent shadow-none w-5 h-5"
          />
          <Label
            htmlFor={CategoryType.Favorite}
            className="font-inter font-normal text-sm lg:text-xs leading-5 text-left underline-none"
          >
            Favorite categories
          </Label>
        </div>
      </RadioGroup>
      <div className="flex flex-col items-start space-y-2">
        {categories
          .filter((category) =>
            categoryType === CategoryType.Favorite ? category.favorite : true
          )
          .map((category) => (
            <CategoryButton
              id={category.id}
              key={category.id}
              label={category.name}
              favorite={category.favorite}
              selected={selectedCategory.id === category.id}
            />
          ))}
      </div>
    </div>
  );
}

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
