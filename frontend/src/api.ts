import { Category, Post } from "./shared-types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories(): Promise<Category[]> {
  return fetch(`${API_URL}/categories`).then((res) => res.json());
}

export async function getPostsFromCategory(
  categoryId: string
): Promise<Post[]> {
  return fetch(`${API_URL}/categories/${categoryId}/posts`).then((res) =>
    res.json()
  );
}

export async function setCategory(
  id: string,
  data: Partial<Category>
): Promise<Category> {
  return fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
