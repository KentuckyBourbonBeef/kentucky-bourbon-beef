import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 text-center px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Kentucky Bourbon Beef
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          The Bourbon Grains finishing process infuses our beef with subtle bourbon-inspired flavors, creating a one-of-a-kind culinary experience.
        </p>
        <Button 
          size="lg" 
          className="bg-bourbon-600 hover:bg-bourbon-700 text-white"
          onClick={() => scrollToSection('products')}
        >
          Shop Premium Cuts
        </Button>
      </div>
    </div>
  );
};

export default Hero;