import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CategoryButton } from "./category-button";
import { useFeedProvider } from "@/hooks/use-feed";
import { formatDate } from "@/lib/utils";

export default function Feed() {
  const { categoriesById, posts, selectedCategory } = useFeedProvider();

  return (
    <Card className="border border-primary-foreground rounded">
      <CardHeader className="border-b text-md lg:text-sm font-semibold p-5 text-secondary-foreground w-[100%]">
        Found {posts.length} posts of "{selectedCategory.name}"
      </CardHeader>
      {posts.length !== 0 && (
        <CardContent className="p-8 flex flex-col gap-8">
          {posts.map((post, index) => (
            <div key={post.id} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-md lg:text-sm font-semibold text-primary">
                  {formatDate(post.date)}
                </h2>
                <p className="text-lg lg:text-sm text-secondary-foreground">
                  {post.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {post.categories.map((categoryId) => {
                    const category = categoriesById[categoryId];

                    return (
                      <CategoryButton
                        label={category.name}
                        favorite={category.favorite}
                        selected={category.id === selectedCategory.id}
                        key={category.id}
                        id={category.id}
                      ></CategoryButton>
                    );
                  })}
                </div>
              </div>
              {index !== posts.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
