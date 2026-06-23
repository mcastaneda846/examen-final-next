"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  specs?: Record<string, string>;
};

export default function ProductDetail({ id }: { id: string }) {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
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
        productId: product._id,
      }),
    });

    if (!res.ok) {
      toast.error("Error al agregar al carrito");
      return;
    }

    toast.success("Producto agregado al carrito 🛒");

    router.refresh();
  }

  if (loading) {
    return (
      <div className="py-32 text-center">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        Producto no encontrado
      </div>
    );
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
          <h1 className="text-5xl font-light">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-semibold">
            ${product.price.toLocaleString()}
          </p>

          <p className="mt-8 text-zinc-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <span className="font-semibold">
              Stock disponible:
            </span>{" "}
            {product.stock}
          </div>

          {product.specs && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Especificaciones
              </h3>

              <div className="space-y-3">
                {Object.entries(product.specs).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2"
                    >
                      <span>{key}</span>
                      <span>{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={userLoading}
            className="
              mt-12
              px-8
              py-4
              bg-black
              text-white
              rounded-full
              hover:bg-zinc-800
              transition
              disabled:opacity-50
            "
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}