import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll";
import { ArrowDownCircle, Award, Clock, MapPin } from "lucide-react";
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
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fadeIn space-y-8">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            Kentucky Bourbon Beef
          </h1>

          {/* Branded Subtitle */}
          <div className="inline-block">
            <h2 className="font-serif italic text-2xl md:text-3xl text-bourbon-100 font-bold">
              BDC Butcher Distiller's Cut™
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mt-6">
            Experience the pinnacle of flavor where Kentucky's bourbon heritage meets premium dry-aged beef, 
            crafted with the same patience and artistry as our finest spirits.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-bourbon-400/20">
              <Award className="h-8 w-8 text-bourbon-400" />
              <span className="text-white/90 font-medium">Bourbon-Grain Finished</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-bourbon-400/20">
              <Clock className="h-8 w-8 text-bourbon-400" />
              <span className="text-white/90 font-medium">45-Day Dry-Aged</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-bourbon-400/20">
              <MapPin className="h-8 w-8 text-bourbon-400" />
              <span className="text-white/90 font-medium">Kentucky Proud</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <Button 
              size="lg" 
              className="bg-bourbon-600 hover:bg-bourbon-700 text-white min-w-[200px] text-lg h-14"
              onClick={() => scrollToSection('products')}
            >
              Shop Premium Cuts
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 min-w-[200px] text-lg h-14"
              onClick={() => scrollToSection('about')}
            >
              Our Story
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDownCircle className="h-8 w-8 text-white/60" />
        </div>
      </div>
    </div>
  );
};

export default Hero;