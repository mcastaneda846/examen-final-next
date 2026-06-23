"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { addFavorite, removeFavorite } from "@/lib/favorites";

import { useEffect } from "react";

type ProductCardProps = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  isFavorite?: boolean;
};

export default function ProductCard({
  _id,
  name,
  price,
  imageUrl,
  isFavorite = false,
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  async function toggleFavorite() {
    try {
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
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
        >
          <Heart
            size={22}
            className={favorite ? "fill-red-500 text-red-500" : "text-zinc-700"}
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-medium text-zinc-900">{name}</h3>

        <p className="mt-2 text-xl font-semibold">${price.toLocaleString()}</p>

        <Link
          href={`/products/${_id}`}
          className="mt-4 inline-block text-sm uppercase tracking-wider text-zinc-700 hover:text-black"
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}
