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
        <div className="inline-block relative perspective-[1000px]">
          <div className="font-serif italic text-bourbon-100/90 text-lg md:text-2xl mb-8 font-bold relative px-16 py-4
            before:content-[''] before:absolute before:inset-0
            after:content-[''] after:absolute after:inset-0
            transform-style-preserve-3d hover:transform hover:rotate-y-3 transition-transform duration-500
            [background-image:repeating-linear-gradient(90deg,#2a1810,#3a241a_2px,#4a2e22_4px,#5a3828_8px,#3a241a_12px,#2a1810_16px)]
            [box-shadow:0_15px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)]
            rounded-lg
            before:[background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PGZpbHRlciBpZD0iYSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjg1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjUgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]
            before:opacity-30
            before:mix-blend-overlay
            after:[background-image:radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]
            after:mix-blend-overlay">
            BDC Butcher Distillers Cut
            <span className="absolute -right-3 top-0 font-sans text-[0.65em] tracking-wider font-normal 
              px-3 py-1.5 transform rotate-12
              [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]
              before:content-[''] before:absolute before:inset-0
              before:[background-image:linear-gradient(45deg,rgba(42,24,16,0.9),rgba(58,36,26,0.7))]
              before:opacity-90 before:-z-10 before:rounded-sm
              after:content-[''] after:absolute after:inset-0
              after:[background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.2),transparent_1px,transparent_2px,rgba(0,0,0,0.2)_3px)]
              after:opacity-40 after:-z-20
              [filter:brightness(0.9)_contrast(1.2)]
              [transform-style:preserve-3d]
              [transform:rotateX(10deg)_translateZ(2px)]
              text-bourbon-100/80
              border-bourbon-900/30 border rounded-sm
              [box-shadow:inset_0_0_4px_rgba(0,0,0,0.5)]">
              ™
            </span>
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