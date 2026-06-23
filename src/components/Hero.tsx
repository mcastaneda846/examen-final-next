import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#FAF7F5]">
      {" "}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div>
            <h2 className="text-6xl font-light text-zinc-900 leading-tight">
              Elegancia
              <br />
              en cada detalle
            </h2>

            <p className="mt-8 text-lg text-zinc-600 max-w-lg">
              Descubre prendas exclusivas diseñadas para mujeres que buscan
              sofisticación, estilo y calidad premium.
            </p>

            <button className="mt-10 px-8 py-4 bg-black text-white rounded-full hover:opacity-90 transition">
              Explorar colección
            </button>
          </div>

          <div className="relative h-[650px] rounded-[40px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
              alt="Boutique Luxe"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
