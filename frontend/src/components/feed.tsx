import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader } from "./ui/card";
import { CategoryButton } from "./category-button";
import { useFeedProvider } from "@/hooks/use-feed";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);
  const formattedDate = parts
    .map((part) => {
      if (part.type === "day") {
        return part.value + getOrdinalSuffix(Number(part.value));
      }
      return part.value;
    })
    .join("");

  return formattedDate;
}

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
            <>
              <div key={post.id} className="space-y-4">
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
            </>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
