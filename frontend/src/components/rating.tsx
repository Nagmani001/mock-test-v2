import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { toast } from "sonner"
import axios from "axios";
import { BASE_URL } from "@/config/utils";
import Review from "./review";
import { useAuth } from "@clerk/clerk-react";

interface Review {
  id: string,
  meaning: string,
  message: string,
  stars: number,
  timeStamp: Date
  name: string
}

export default function Rating() {
  const [comment, setComment] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(2);
  const [meaning, setMeaning] = useState<string>("");
  const [reviews, setReview] = useState<Review[]>([]);

  const auth = useAuth();

  useEffect(() => {
    const main = async () => {
      try {
        const ratings = await axios.get(`${BASE_URL}/api/v1/review`);
        setReview(ratings.data.msg);
        console.log(typeof reviews);
        console.log("rating", ratings.data.msg)
      } catch (err) {
        console.log(err);
      }
    }
    main();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="font-semibold text-2xl text-gray-900 mb-6">Ratings and Reviews</h2>

      <div className="space-y-6">
        <div className="text-gray-700">How was the test Experience?</div>

        {/* Rating Stars */}
        <div className="rating">
          <input
            onChange={() => {
              setRating(1);
              setMeaning("Poor");
            }}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
          />
          <input
            onChange={() => {
              setRating(2);
              setMeaning("Needs improvement");
            }}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="2 star"
            defaultChecked
          />
          <input
            onChange={() => {
              setRating(3);
              setMeaning("Satisfactory");
            }}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="3 star"
          />
          <input
            onChange={() => {
              setRating(4);
              setMeaning("Good");
            }}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="4 star"
          />
          <input
            onChange={() => {
              setRating(5);
              setMeaning("Excellent");
            }}
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="5 star"
          />
        </div>

        <div className="font-semibold text-base text-gray-900">{meaning}</div>

        <Textarea
          placeholder="Comment (optional)"
          onChange={(e: any) => {
            setComment(e.target.value);
          }}
          className="min-h-[100px] resize-none"
        />

        <Button
          variant="primary"
          onClick={async () => {
            try {
              const token = await auth.getToken();
              setLoading(true);
              await axios.post(`${BASE_URL}/api/v1/review`, {
                message: comment,
                stars: rating,
                meaning: meaning == "Needs improvement" ? "Needs_Improvement" : meaning
              }, {
                headers: {
                  Authorization: token
                }
              });
              setLoading(false);
              toast("Review sent successfully");
            } catch (err) {
              console.log(err);
            }
          }}
          className="w-32"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Post"
          )}
        </Button>
      </div>

      {/* Reviews List */}
      <div className="mt-8 space-y-4">
        {reviews.map((review: Review) => (
          <Review
            key={review.id}
            name={review.name}
            date={review.timeStamp}
            stars={review.stars}
            comment={review.message}
          />
        ))}
      </div>
    </div>
  );
}

