import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll";
import { ArrowDownCircle, Award, Clock, MapPin } from "lucide-react";

const Hero = () => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fadeIn">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
          Kentucky Bourbon Beef
        </h1>
        <div className="inline-block relative">
          <div className="font-serif italic text-bourbon-400 text-lg md:text-2xl mb-8 font-bold relative px-12 py-3
            before:content-[''] before:absolute before:inset-0 before:border-2 before:border-bourbon-400/30
            after:content-[''] after:absolute after:inset-[3px] after:border after:border-bourbon-400/60
            [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)]
            bg-[linear-gradient(to_right,rgba(139,69,19,0.1),rgba(139,69,19,0.2)_49%,rgba(139,69,19,0.1))]
            before:transform before:skew-x-12
            after:transform after:skew-x-12
            before:rounded-lg after:rounded-lg
            before:bg-[linear-gradient(45deg,rgba(165,42,42,0.1),transparent_40%,transparent_60%,rgba(165,42,42,0.1))]
            after:bg-[linear-gradient(-45deg,rgba(165,42,42,0.1),transparent_40%,transparent_60%,rgba(165,42,42,0.1))]">
            BDC Butcher Distillers Cut<span className="font-sans text-[0.7em] tracking-wider align-super ml-0.5 font-normal 
              bg-bourbon-400/10 px-1 rounded transform -rotate-12 inline-block">™</span>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experience the pinnacle of flavor where Kentucky's bourbon heritage meets premium dry-aged beef.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Award className="h-6 w-6 text-bourbon-400" />
            <span>Bourbon-Grain Finished</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Clock className="h-6 w-6 text-bourbon-400" />
            <span>Carefully Dry-Aged</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <MapPin className="h-6 w-6 text-bourbon-400" />
            <span>Kentucky Proud</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-bourbon-600 hover:bg-bourbon-700 text-white min-w-[200px]"
            onClick={() => scrollToSection('products')}
          >
            Shop Premium Cuts
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 min-w-[200px]"
            onClick={() => scrollToSection('about')}
          >
            Our Story
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDownCircle className="h-8 w-8 text-white/60" />
        </div>
      </div>
    </div>
  );
};

export default Hero;