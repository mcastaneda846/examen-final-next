export async function getFavorites() {
  const res = await fetch("/api/favorites");

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function addFavorite(
  recipeId: string
) {
  return fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      recipeId,
    }),
  });
}

export async function removeFavorite(
  recipeId: string
) {
  return fetch("/api/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      recipeId,
    }),
  });
}