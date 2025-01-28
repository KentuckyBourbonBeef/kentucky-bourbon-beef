import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductList />
      <Process />
      <About />
      <FAQ />
    </main>
  );
};

export default Index;