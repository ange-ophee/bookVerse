import { Link } from 'react-router-dom';

// Helper to render stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) stars.push('★');
    else stars.push('☆');
  }
  return stars.join(' ');
};

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-image">
        <img
            src={book.coverImage || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80'}
            alt={book.title}
        />
        <div className="overlay">
          <p className="summary">{book.summary}</p>
          <Link to={`/books/${book._id}`} className="btn">View Details</Link>
        </div>
      </div>

      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="rating">{renderStars(book.averageRating || 0)}</p>
      </div>

      <style>{`
        .book-card {
          position: relative;
          background: #FAF7F0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .book-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        .book-image {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }

        .book-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }

        .book-card:hover .book-image img {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.65);
          color: #FAF7F0;
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          text-align: center;
        }

        .book-card:hover .overlay {
          opacity: 1;
        }

        .overlay .summary {
          font-size: 0.95rem;
          margin-bottom: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 100px;
        }

        .overlay .btn {
          padding: 0.5rem 1.5rem;
          border: none;
          border-radius: 6px;
          background-color: #2E7D32;
          color: #f2e6cb;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }

        .book-card-content {
          padding: 1rem;
        }

        .book-card-content h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
        }

        .book-card-content p.author {
          font-weight: bold;
          margin: 0 0 0.5rem 0;
          color: #2F3E34;
        }

        .book-card-content p.rating {
          font-size: 1rem;
          color: #e7c60a; /* gold stars */
          margin: 0;
        }
      `}</style>
    </div>
  );
}
