import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview as addReviewAPI } from '../services/bookService';
import { AuthContext } from '../context/AuthContext';

export default function BookDetailsPage() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    getBookById(id).then(res => setBook(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert('You must be logged in to review!');
    if (rating === 0) return alert('Please select a rating');

    await addReviewAPI(id, { rating, comment }, token);

    const updated = await getBookById(id);
    setBook(updated.data);
    setRating(0);
    setComment('');
  };

  if (!book) return <p>Loading...</p>;

  // ⭐ Real star rendering (no visual lies)
  const renderStars = (num) => (
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ fontSize: '1.1rem' }}>
        {i < num ? '⭐' : '☆'}
      </span>
    ))
  );

  return (
    <>
      <style>{`
        .details-container {
          max-width: 1100px;
          margin: 2rem auto;
          padding: 2rem;
          background: #FAF7F0;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .book-header {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 2rem;
        }

        .book-header img {
          width: 280px;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }

        .book-info h2 {
          font-size: 2.2rem;
          color: #2E7D32;
        }

        .author {
          font-weight: bold;
          color: #6D4C41;
        }

        .summary {
          color: #5A5A5A;
          margin-top: 0.5rem;
        }

        .review-card {
          background: #EDE6DB;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .add-review {
          margin-top: 2rem;
          background: #F4EEE2;
          padding: 1rem;
          border-radius: 10px;
        }

        select, textarea {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.5rem;
        }

        button {
          margin-top: 0.7rem;
          background: #2E7D32;
          color: #FAF7F0;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background: #1B5E20;
        }
      `}</style>

      <div className="details-container">
        <div className="book-header">
          <img src={book.coverImage} alt={book.title} />
          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="author">{book.author}</p>
            <p className="summary">{book.summary}</p>
            <p>Average Rating: {renderStars(Math.round(book.averageRating || 0))}</p>
          </div>
        </div>

        <div>
          <h3>Reviews</h3>
          {book.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            book.reviews.map(r => (
              <div key={r._id} className="review-card">
                <strong>{r.userId.username}</strong>
                <div>{renderStars(r.rating)}</div>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div>

        {user && (
          <form className="add-review" onSubmit={handleSubmit}>
            <h3>Add Your Review</h3>

            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value={0}>Select rating</option>
              <option value={1}>⭐ 1</option>
              <option value={2}>⭐ 2</option>
              <option value={3}>⭐ 3</option>
              <option value={4}>⭐ 4</option>
              <option value={5}>⭐ 5</option>
            </select>

            <textarea
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button type="submit">Submit Review</button>
          </form>
        )}
      </div>
    </>
  );
}
