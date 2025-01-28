import Hero from "@/components/Hero";
import FeaturedCuts from "@/components/FeaturedCuts";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCuts />
      <Process />
      <About />
      <FAQ />
    </main>
  );
};

export default Index;