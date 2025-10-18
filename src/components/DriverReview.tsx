import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

interface DriverReviewProps {
  driverId: string;
  driverName: string;
}

export const DriverReview = ({ driverId, driverName }: DriverReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmitReview = () => {
    // TODO: Implement API call to save review
    toast({
      title: "Avis envoyé !",
      description: "Merci d'avoir partagé votre expérience.",
    });
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Évaluer {driverName}
      </h3>
      
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hoveredStar ?? rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating} sur 5
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Votre commentaire</span>
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience..."
          className="min-h-[100px]"
        />
      </div>

      <Button 
        onClick={handleSubmitReview}
        className="w-full bg-brand-blue hover:bg-brand-blue/90"
        disabled={!rating}
      >
        Envoyer mon avis
      </Button>
    </div>
  );
};