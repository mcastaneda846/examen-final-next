export async function getFavorites() {
  const res = await fetch("/api/favorites");

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function addFavorite(
  productId: string
) {
  return fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
}

export async function removeFavorite(
  productId: string
) {
  return fetch("/api/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
}