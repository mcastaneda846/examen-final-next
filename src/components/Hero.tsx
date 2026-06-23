import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div>
            <h2 className="text-6xl font-light text-zinc-900 leading-tight">
              Sabores
              <br />
              que inspiran
            </h2>

            <p className="mt-8 text-lg text-zinc-600 max-w-lg">
              Descubre recetas caseras, fáciles y deliciosas creadas para
              disfrutar cada momento en la cocina y compartir en familia.
            </p>

            <button className="mt-10 px-8 py-4 bg-black text-white rounded-full hover:opacity-90 transition">
              Explorar recetas
            </button>
          </div>

          <div className="relative h-[650px] rounded-[40px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488"
              alt="Recetas de cocina"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}