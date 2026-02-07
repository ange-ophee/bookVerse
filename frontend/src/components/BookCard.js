import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.summary}</p>
      </div>
      <Link to={`/books/${book._id}`} className="btn">View Details</Link>
    </div>
  );
}
