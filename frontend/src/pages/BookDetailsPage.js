import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview } from '../services/bookService';
import ReviewForm from '../components/ReviewForm';

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const fetchBook = () => {
    getBookById(id).then(res => setBook(res.data)).catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    addReview(id, { comment: text })
      .then(() => {
        e.target.reset();
        fetchBook();
      })
      .catch(err => console.error(err));
  };

  if (!book) return <p className="text-[#4E342E] p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#4E342E]">{book.title}</h2>
      <p className="text-[#6D4C41]">{book.author}</p>
      <p className="mt-2 text-[#6D4C41]">{book.summary}</p>
      <h3 className="text-2xl font-semibold mt-4 text-[#4E342E]">Reviews:</h3>
      {book.reviews?.length === 0 ? (
        <p className="text-[#6D4C41]">No reviews yet.</p>
      ) : (
        <div className="mt-2 space-y-2">
          {book.reviews.map(r => (
            <div key={r._id} className="bg-[#DCCCA3] p-2 rounded shadow">
              <p className="font-semibold text-[#4E342E]">{r.userId?.username}</p>
              <p className="text-[#6D4C41]">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}
