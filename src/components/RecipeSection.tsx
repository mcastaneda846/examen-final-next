"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

type Recipe = {
  _id: string;
  name: string;
  imageUrl: string;
  prepTime: number;
  difficulty: string;
};

export default function RecipeSection() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12 text-center">
          <span className="uppercase tracking-[0.3em] text-sm text-[#C46B3D]">
            Sabores Caseros
          </span>

          <h2 className="mt-3 text-5xl font-light">
            Recetas destacadas de la semana
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              {...recipe}
            />
          ))}
        </div>
      </div>
    </section>
  );
}