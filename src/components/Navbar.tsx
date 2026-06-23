"use client";

import Link from "next/link";
import { Heart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  // cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-3xl font-light tracking-widest text-black">
              Sabores Caseros
            </h1>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-wider text-zinc-800">
            <Link href="/">Inicio</Link>
            <Link href="/favorites">Favoritos</Link>
          </nav>

          {/* Right side */}
<div className="flex items-center gap-5">
  <Link href="/favorites">
    <Heart size={22} />
  </Link>

  {loading ? null : user ? (
    <div ref={menuRef} className="relative flex items-center gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-black"
      >
        {user.name}
      </button>

      <User size={20} />

      {open && (
        <div className="absolute right-0 mt-10 w-32 bg-white border border-zinc-200 rounded-md shadow-md">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  ) : (
    // asegurar que el Link sea clickeable
    <Link href="/login" className="flex items-center">
      <User size={22} className="cursor-pointer" />
    </Link>
  )}
</div>
        </div>
      </div>
    </header>
  );
}
