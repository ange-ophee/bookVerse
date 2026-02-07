import { useState } from 'react';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.elements.review.value;
    onSubmit({ rating, reviewText });
    e.target.reset();
    setRating(0);
  };

  return (
    <form
      className="bg-[#FAF7F0] p-5 rounded-lg shadow-lg flex flex-col gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      {/* STAR RATING */}
      <div className="flex gap-1 justify-center mb-2 cursor-pointer">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl transition-colors ${
              i < rating ? 'text-[#2E7D32]' : 'text-[#CFC5B9]'
            }`}
            onClick={() => setRating(i + 1)}
            onMouseOver={() => setRating(i + 1)}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* REVIEW TEXTAREA */}
      <textarea
        name="review"
        className="w-full p-3 border border-[#6D4C41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        placeholder="Write your review..."
        required
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-[#2E7D32] text-[#FAF7F0] px-4 py-2 rounded-md font-semibold hover:bg-[#1B5E20] transition"
      >
        Submit Review
      </button>
    </form>
  );
}
