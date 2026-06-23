"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type RecipeCardProps = {
  _id: string;
  name: string;
  imageUrl: string;
  prepTime: number;
  difficulty: string;
  isFavorite?: boolean;
};

export default function RecipeCard({
  _id,
  name,
  imageUrl,
  prepTime,
  difficulty,
  isFavorite = false,
}: RecipeCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  async function toggleFavorite() {
    try {
      // Si no està logueado lo manda al login
      if (!user) {
        router.push("/login");
        return;
      }

      // evitar clicks mientras carga user
      if (loading) return;

      // toggle favorito
      if (favorite) {
        await removeFavorite(_id);
        setFavorite(false);
      } else {
        await addFavorite(_id);
        setFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:shadow-xl transition-all duration-300">
      <div className="relative h-[420px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        <button
          onClick={toggleFavorite}
          disabled={loading}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
        >
          <Heart
            size={22}
            className={favorite ? "fill-red-500 text-red-500" : "text-zinc-700"}
          />
        </button>

        {/* Info overlay receta */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm flex justify-between">
          <span>{prepTime} min</span>
          <span>{difficulty}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-medium text-zinc-900">{name}</h3>

        <Link
          href={`/recipes/${_id}`}
          className="mt-4 inline-block text-sm uppercase tracking-wider text-zinc-700 hover:text-black"
        >
          Ver receta →
        </Link>
      </div>
    </div>
  );
}
