import { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(res => setBooks(res.data));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover your next favorite book</h1>
          <p>
            BookVerse is a cozy place to explore books,
            share reviews, and see what others are reading.
          </p>
          <button className="btn">Browse Books</button>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Featured Books</h2>
        <div className="book-grid">
          {books.slice(0, 4).map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Recently Added</h2>
        <div className="book-grid">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}
