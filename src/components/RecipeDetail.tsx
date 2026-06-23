"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Recipe = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  prepTime: number;
  difficulty: string;
  servings: number;
  ingredients?: string[];
  steps?: string[];
};

export default function RecipeDetail({ id }: { id: string }) {

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="py-32 text-center">Cargando receta...</div>;
  }

  if (!recipe) {
    return <div className="py-32 text-center">Receta no encontrada</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="relative h-[700px] rounded-3xl overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-5xl font-light">{recipe.name}</h1>

          <div className="mt-6 flex gap-6 text-lg text-zinc-700">
            <span>{recipe.prepTime} min</span>
            <span>{recipe.difficulty}</span>
            <span>{recipe.servings} porciones</span>
          </div>

          <p className="mt-8 text-zinc-700 leading-relaxed">
            {recipe.description}
          </p>

          {recipe.ingredients && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Ingredientes
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                {recipe.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.steps && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Preparación
              </h3>

              <ol className="list-decimal pl-5 space-y-3 text-zinc-700">
                {recipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}