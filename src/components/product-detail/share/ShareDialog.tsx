import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check out this amazing bourbon-aged beef!")}`;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this product with your friends and family
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center p-6"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="h-6 w-6 mb-2" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-6"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="h-6 w-6 mb-2" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-6"
            onClick={() => handleShare("copy")}
          >
            <LinkIcon className="h-6 w-6 mb-2" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}