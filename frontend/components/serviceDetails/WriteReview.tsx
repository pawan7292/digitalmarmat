"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import LoginFormContent from "@/components/login/LoginFormContent";
import SignUpFormContent from "@/components/signup/SignUpFormContent";
import { getUserData } from "@/lib/fetches/user";
import { rateServiceAction } from "@/lib/actions/rate-service";

interface WriteReviewProps {
  slug: string;
  onReviewSubmitted: () => void;
}

export default function WriteReview({
  slug,
  onReviewSubmitted,
}: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    setError(null);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!review.trim()) {
      setError("Please write a review");
      return;
    }

    // Check if user is authenticated
    if (!user?.name) {
      setShowAuthDialog(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await rateServiceAction(slug, rating, review);
      setRating(0);
      setReview("");
      onReviewSubmitted();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to submit review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuthDialog(false);
    // Reload the page to update user state
    window.location.reload();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Your Rating
              </Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <FaStar
                      size={24}
                      className={
                        star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label
                htmlFor="review"
                className="text-sm font-medium mb-2 block"
              >
                Your Review
              </Label>
              <Textarea
                id="review"
                placeholder="Share your experience with this service..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-fit self-center"
              variant="book"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Auth Dialog */}
      {showAuthDialog && (
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          {isLogin ? (
            <LoginFormContent
              switchForm={() => setIsLogin(false)}
              setUser={handleAuthSuccess}
            />
          ) : (
            <SignUpFormContent switchForm={() => setIsLogin(true)} />
          )}
        </Dialog>
      )}
    </>
  );
}
