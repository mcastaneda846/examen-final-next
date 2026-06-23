import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/RecipeSection";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductSection />
    </>
  );
}