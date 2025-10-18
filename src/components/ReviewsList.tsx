
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">{review.userName}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-600 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
