import { useFeedProvider } from "@/hooks/use-feed";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export function CategoryButton({
  id,
  label,
  favorite = false,
  selected = false,
}: {
  label: string;
  favorite?: boolean;
  selected?: boolean;
}) {
  const { setSelectedCategory, categoriesById, setFavorite } =
    useFeedProvider();

  const getStarColor = () => {
    const colors = {
      true: {
        true: "primary",
        false: "accent",
      },
      false: {
        true: "accent",
        false: "primary",
      },
    };

    return colors[favorite.toString()][selected.toString()];
  };

  return (
    <Button
      variant={selected ? "outline" : "default"}
      className={"border-primary rounded capitalize gap-2"}
      onClick={() => {
        setSelectedCategory(categoriesById[id]);
        console.log("button");
      }}
    >
      {label}
      <Star
        fill={`hsl(var(--${getStarColor()}))`}
        className="z-10"
        style={{
          pointerEvents: "auto",
        }}
        onClick={(event) => {
          event.stopPropagation();
          setFavorite(id, !favorite);
        }}
      />
    </Button>
  );
}
