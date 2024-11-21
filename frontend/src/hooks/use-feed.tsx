import { getCategories, getPostsFromCategory, setCategory } from "@/api/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorageState } from "ahooks";
export enum CategoryType {
  All = 0,
  Favorite = 1,
}

const FeedContext = createContext({
  categories: [],
  posts: [],
  selectedCategory: CategoryType.All,
  setSelectedCategory: () => false,
});

export const FeedProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesById, setCategoriesById] = useState({});
  const [categoryType, setCategoryType] = useState(CategoryType.All);
  const [selectedCategory, setSelectedCategory] = useLocalStorageState<
    string | undefined
  >("SELECTED_CATEGORY", {
    defaultValue: {},
  });

  const [posts, setPosts] = useState([]);

  const [shouldRefetch, setShouldRefetch] = useState(true);

  const setFavorite = useCallback(
    async (id: string, favorite: boolean) => {
      const category = categoriesById[id];
      await setCategory(category.id, {
        ...category,
        favorite,
      });
      setShouldRefetch(true);
    },

    [categoriesById]
  );

  useEffect(() => {
    if (!shouldRefetch) return;

    const get = async () => {
      const categories = await getCategories();
      setCategories(categories);

      const categoriesById = categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
      }, {});

      setCategoriesById(categoriesById);

      if (categories.length === 0) return;

      if (Object.keys(selectedCategory).length === 0)
        setSelectedCategory(categories[0]);

      const posts = await getPostsFromCategory(selectedCategory.id);
      setPosts(posts);

      setShouldRefetch(false);
    };

    get();
  }, [shouldRefetch]);

  useEffect(() => {
    const get = async () => {
      const posts = await getPostsFromCategory(selectedCategory.id);
      setPosts(posts);
    };

    get();
  }, [selectedCategory]);

  return (
    <FeedContext.Provider
      value={{
        categories,
        posts,
        categoryType,
        setCategoryType,
        categoriesById,
        selectedCategory,
        setSelectedCategory,
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
