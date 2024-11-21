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
import React, { useMemo } from "react";
import { useFeedProvider } from "@/hooks/use-feed";
import { Category, CategoryType } from "@/shared-types";

const labelForCategoryType = {
  [CategoryType.All]: "All categories",
  [CategoryType.Favorite]: "Favorite categories",
};

function Option({ categoryType }: { categoryType: CategoryType }) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={categoryType}
        id={categoryType}
        className="border border-accent shadow-none w-5 h-5"
      />
      <Label
        htmlFor={categoryType}
        className="font-inter font-normal text-sm lg:text-xs leading-5 text-left underline-none"
      >
        {labelForCategoryType[categoryType]}
      </Label>
    </div>
  );
}

function Categories() {
  const { categories, categoryType, setCategoryType, selectedCategory } =
    useFeedProvider();

  const filteredCategories = useMemo(
    () =>
      categories.filter((category: Category) => {
        const onlyFavorites = categoryType === CategoryType.Favorite;
        if (onlyFavorites) return category.favorite;

        return true;
      }),
    [categories, categoryType]
  );

  return (
    <div className="flex flex-col gap-12">
      <RadioGroup
        defaultValue={categoryType}
        onValueChange={setCategoryType}
        className="flex gap-4"
      >
        <Option categoryType={CategoryType.All} />
        <Option categoryType={CategoryType.Favorite} />
      </RadioGroup>
      <div className="flex flex-col items-start space-y-2">
        {filteredCategories.map((category: Category) => (
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
