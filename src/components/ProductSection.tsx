"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12 text-center">
          <span className="uppercase tracking-[0.3em] text-sm text-[#8B5E83]">
            Boutique Luxe
          </span>

          <h2 className="mt-3 text-5xl font-light">
            Destacados de la Semana
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}