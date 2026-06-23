"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";

type FavoriteItem = {
  _id: string;

  recipeId: {
    _id: string;
    name: string;
    imageUrl: string;
    prepTime: number;
    difficulty: string;
  };
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-light mb-12">Mis Recetas Favoritas</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : favorites.length === 0 ? (
          <p className="text-zinc-500">No tienes recetas favoritas aún.</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-8">
            {favorites.map((item) => (
              <RecipeCard
                key={item.recipeId._id}
                _id={item.recipeId?._id}
                name={item.recipeId.name}
                imageUrl={item.recipeId.imageUrl}
                prepTime={item.recipeId.prepTime}
                difficulty={item.recipeId.difficulty}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
