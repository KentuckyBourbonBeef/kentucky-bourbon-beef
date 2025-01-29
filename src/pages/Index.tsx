import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ShareButtons from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { UserRound, Shield, FileText } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <Link 
              to="/privacy-policy" 
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <Shield className="h-4 w-4 mr-1" />
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <FileText className="h-4 w-4 mr-1" />
              Terms of Service
            </Link>
          </div>
          <div className="text-center mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Kentucky Bourbon Beef. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;