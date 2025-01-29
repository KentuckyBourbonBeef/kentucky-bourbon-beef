import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  title?: string;
  description?: string;
  className?: string;
}

const ShareButtons = ({ 
  title = "Kentucky Bourbon Beef | Premium Dry-Aged Bourbon-Finished Beef",
  description = "Experience the unique flavor of Kentucky Bourbon Beef, carefully aged and finished with bourbon stillage.",
  className = ""
}: ShareButtonsProps) => {
  const { toast } = useToast();
  const url = window.location.href;

  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "The link has been copied to your clipboard.",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        className="hover:text-blue-600 transition-colors"
      >
        <Facebook className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        className="hover:text-sky-500 transition-colors"
      >
        <Twitter className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("copy")}
        className="hover:text-gray-700 transition-colors"
      >
        <LinkIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ShareButtons;