export const API = "http://localhost:9000";

export async function getCategories() {
  return fetch(`${API}/categories`).then((res) => res.json());
}

export async function getPostsFromCategory(categoryId: string) {
  return fetch(`${API}/categories/${categoryId}/posts`).then((res) =>
    res.json()
  );
}

export async function setCategory(id: string, data) {
  return fetch(`${API}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
