"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();

  const [product, setProduct] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;

    if (userLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: product._id,
      }),
    });

    if (!res.ok) {
      toast.error("Error al guardar receta");
      return;
    }

    toast.success("Receta guardada en favoritos");

    router.refresh();
  }

  if (loading) {
    return <div className="py-32 text-center">Cargando receta...</div>;
  }

  if (!product) {
    return <div className="py-32 text-center">Receta no encontrada</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="relative h-[700px] rounded-3xl overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-5xl font-light">{product.name}</h1>

          <div className="mt-6 flex gap-6 text-lg text-zinc-700">
            <span>{product.prepTime} min</span>
            <span>{product.difficulty}</span>
            <span>{product.servings} porciones</span>
          </div>

          <p className="mt-8 text-zinc-700 leading-relaxed">
            {product.description}
          </p>

          {product.ingredients && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Ingredientes
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                {product.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {product.steps && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Preparación
              </h3>

              <ol className="list-decimal pl-5 space-y-3 text-zinc-700">
                {product.steps.map((step, i) => (
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