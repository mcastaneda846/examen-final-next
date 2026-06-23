"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Error al iniciar sesión"
        );
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Imagen lateral */}
      <div
        className="hidden lg:flex bg-cover bg-center relative"
        style={{
          backgroundImage:
"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600')"        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex flex-col justify-end p-16 text-white">
          <h1 className="text-6xl font-light tracking-widest">
            Sabores Caseros
          </h1>

          <p className="mt-6 max-w-md text-lg text-white/90">
              Descubre recetas deliciosas,
              sabores auténticos y platos
              que inspiran cada día.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-light text-black">
              Sabores Caseros
            </h2>

            <p className="mt-3 text-zinc-600">
              Accede a tu cuenta para
              gestionar favoritos,
              y descubrir nuevas recetas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Correo electrónico
              </label>

              <input
                type="email"
                disabled={loading}
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-black outline-none focus:border-black"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3">
                <p className="text-red-600 text-sm">
                  {error}
                </p>
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
              {loading
                ? "Ingresando..."
                : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-10 border-t border-zinc-200 pt-8 text-center">
            <p className="text-zinc-600">
              ¿No tienes una cuenta?
            </p>

            <Link
              href="/register"
              className="inline-block mt-3 text-black font-medium hover:underline"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}