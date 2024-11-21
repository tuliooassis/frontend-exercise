export type Category = {
  id: string;
  name: string;
  favorite: boolean;
};

export type Post = {
  id: string;
  description: string;
  date: string;
  categories: string[];
};

export enum CategoryType {
  All = 0,
  Favorite = 1,
}
