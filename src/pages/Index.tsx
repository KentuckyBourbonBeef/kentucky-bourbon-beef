import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ShareButtons from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen relative">
      {/* Profile Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => navigate("/profile")}
        >
          <UserRound className="h-5 w-5" />
        </Button>
      </div>

      {/* Share Buttons */}
      <div className="absolute top-4 left-4 z-20">
        <ShareButtons className="bg-white/80 backdrop-blur-sm p-2 rounded-lg" />
      </div>

      <Hero />
      <ProductList />
      <Process />
      <About />
      <FAQ />
    </main>
  );
};

export default Index;