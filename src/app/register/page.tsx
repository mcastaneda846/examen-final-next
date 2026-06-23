"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al registrarse");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Formulario */}
      <div className="flex items-center justify-center px-8 py-16 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-light text-black">Crear Cuenta</h2>

            <p className="mt-3 text-zinc-600">
              Regístrate y descubre miles de recetas deliciosas, comparte tus
              creaciones y explora nuevos sabores cada día.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Nombre completo
              </label>

              <input
                type="text"
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black"
                placeholder="Maribel Castañeda"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Correo electrónico
              </label>

              <input
                type="email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Contraseña
              </label>

              <input
                type="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full rounded-xl py-4 text-white font-medium transition
                ${
                  loading
                    ? "bg-zinc-400 cursor-not-allowed"
                    : "bg-black hover:bg-zinc-800"
                }
              `}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-10 border-t border-zinc-200 pt-8 text-center">
            <p className="text-zinc-600">¿Ya tienes una cuenta?</p>

            <Link
              href="/login"
              className="inline-block mt-3 text-black font-medium hover:underline"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen lateral */}
      <div
        className="hidden lg:flex bg-cover bg-center relative order-1 lg:order-2"
        style={{
          backgroundImage: `url('/recipes/pexels-photo-541216.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex flex-col justify-end p-16 text-white">
          <h1 className="text-6xl font-light tracking-widest">
            Sabores Caseros
          </h1>

          <p className="mt-6 max-w-md text-lg text-white/90">
            Cocina recetas increíbles con ingredientes frescos, descubre nuevas
            ideas cada día y comparte tu pasión por la cocina.
          </p>
        </div>
      </div>
    </main>
  );
}
