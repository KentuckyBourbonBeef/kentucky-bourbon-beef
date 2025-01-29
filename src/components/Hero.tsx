import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll";
import { ArrowDownCircle, Beef } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const scrollToSection = useScrollToSection();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/lovable-uploads/03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
    "/lovable-uploads/972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
    "/lovable-uploads/58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
    "/lovable-uploads/ebf80843-0e99-47e5-b606-b514b484f838.png",
    "/lovable-uploads/afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
    "/lovable-uploads/81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fadeIn space-y-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-bourbon-50/90 tracking-tight">
            Kentucky Bourbon Beef
          </h1>

          <h2 className="font-serif italic text-2xl md:text-3xl text-bourbon-100/80 font-medium">
            BDC Butcher Distiller's Cut™
          </h2>

          {/* Enhanced CTA Button */}
          <div className="mt-12">
            <Button 
              size="lg" 
              className="bg-beef-600 hover:bg-beef-700 text-white min-w-[240px] text-lg h-14 shadow-lg shadow-beef-600/30 hover:shadow-beef-700/40 group transition-all duration-300 hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-beef-500/0 before:via-white/10 before:to-beef-500/0 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:ease-in-out"
              onClick={() => scrollToSection('products')}
            >
              <Beef className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Savor the Tradition
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ArrowDownCircle className="h-8 w-8 text-bourbon-50/80" />
        </div>
      </div>
    </div>
  );
};

export default Hero;