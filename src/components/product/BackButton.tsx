import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute left-0 top-0 inline-flex items-center text-bourbon-600 hover:text-bourbon-700 group transition-colors"
    >
      <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
      Back
    </button>
  );
}