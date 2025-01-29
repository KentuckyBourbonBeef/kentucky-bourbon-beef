export const getCategoryImage = (category: string) => {
  const imageMap: Record<string, string> = {
    ribeye: "/lovable-uploads/972d97c9-c672-448a-b9a5-69950cd6a5f1.png",
    strip: "/lovable-uploads/81e2bf7b-eb02-49f0-afe4-3302a94a27a0.png",
    tenderloin: "/lovable-uploads/58f2f4e4-cb5e-4cce-a375-18ec023efee7.png",
    tomahawk: "/lovable-uploads/03a8f629-b2fd-4729-8c3b-281f41bdc719.png",
    tbone: "/lovable-uploads/afd284f1-4ee0-4d28-b9b5-b8d12cdb6cb0.png",
    porterhouse: "/lovable-uploads/ebf80843-0e99-47e5-b606-b514b484f838.png",
    other: "/placeholder.svg"
  };
  
  return imageMap[category] || imageMap.other;
};