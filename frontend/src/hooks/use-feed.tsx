import { getCategories, getPostsFromCategory, setCategory } from "@/api";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocalStorageState } from "ahooks";
import { Category, CategoryType, Post } from "@/shared-types";

const FeedContext = createContext({
  categories: [],
  posts: [],
  selectedCategory: CategoryType.All,
  setSelectedCategory: () => false,
});

export const FeedProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [posts, setPosts] = useState<Post>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const categoriesById = useMemo(() => {
    return categories.reduce(
      (acc: Record<string, Category>, category: Category) => {
        acc[category.id] = category;
        return acc;
      },
      {}
    );
  }, [categories]);
  const [categoryType, setCategoryType] = useState<CategoryType>(
    CategoryType.All
  );
  const [selectedCategory, setSelectedCategory] = useLocalStorageState<
    string | undefined
  >("SELECTED_CATEGORY", {
    defaultValue: {},
  });

  const selectCategory = useCallback(async (category: Category) => {
    const posts = await getPostsFromCategory(category.id);
    setSelectedCategory(category);
    setPosts(posts);
  });

  const setFavorite = useCallback(
    async (id: string, favorite: boolean) => {
      const category = categoriesById[id];
      await setCategory(category.id, {
        ...category,
        favorite,
      });

      const categories = await getCategories();
      setCategories(categories);
    },

    [categoriesById]
  );

  useEffect(() => {
    const get = async () => {
      const categories = await getCategories();
      setCategories(categories);

      const posts = await getPostsFromCategory(selectedCategory.id);
      setPosts(posts);
    };

    get();
  }, []);

  return (
    <FeedContext.Provider
      value={{
        categories,
        posts,
        categoryType,
        setCategoryType,
        categoriesById,
        selectedCategory,
        selectCategory,
        setFavorite,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export function useFeedProvider() {
  const feed = useContext(FeedContext);
  return feed;
}
