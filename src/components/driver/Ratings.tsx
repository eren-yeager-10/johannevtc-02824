import { Card } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const Ratings = () => {
  const mockRatings = [
    {
      id: "1",
      passenger: "Sophie Bernard",
      date: "2024-03-20",
      rating: 5,
      comment: "Excellent service, très ponctuel et courtois",
    },
    {
      id: "2",
      passenger: "Lucas Petit",
      date: "2024-03-19",
      rating: 4,
      comment: "Bonne expérience, conduite agréable",
    },
  ];

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className="w-6 h-6 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span className="text-lg font-medium">4.8/5</span>
          <span className="text-muted-foreground">(45 avis)</span>
        </div>

        <div className="space-y-4">
          {mockRatings.map((rating) => (
            <div key={rating.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{rating.passenger}</span>
                <span className="text-sm text-muted-foreground">
                  {rating.date}
                </span>
              </div>
              <div className="flex items-center gap-1 my-1">
                {[...Array(rating.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm">{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Ratings;