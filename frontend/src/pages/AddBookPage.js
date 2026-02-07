import { useState } from 'react';
import { addBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';

export default function AddBookPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    summary: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.author || !form.summary || !form.coverImage) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await addBook(form);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="add-book-page">
      <h2>Add a New Book</h2>

      {form.coverImage && (
        <div className="cover-preview">
          <img src={form.coverImage} alt="Cover Preview" />
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={form.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="summary"
          placeholder="Brief summary of the book"
          value={form.summary}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
          required
        />
        <button type="submit">{loading ? 'Adding...' : 'Add Book'}</button>
      </form>

      <style>{`
        .add-book-page {
          max-width: 650px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: #FAF7F0;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          text-align: center;
        }

        .add-book-page h2 {
          color: #2E7D32;
          font-size: 2.2rem;
          margin-bottom: 1.8rem;
        }

        .cover-preview {
          margin-bottom: 1.8rem;
          border-radius: 12px;
          overflow: hidden;
          max-height: 350px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .cover-preview img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .add-book-page form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .add-book-page input,
        .add-book-page textarea {
          padding: 0.9rem 1rem;
          border-radius: 10px;
          border: 1px solid #CFC5B9;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .add-book-page input:focus,
        .add-book-page textarea:focus {
          outline: none;
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46,125,50,0.2);
        }

        .add-book-page textarea {
          min-height: 140px;
          resize: vertical;
        }

        .add-book-page button {
          padding: 0.85rem 2.2rem;
          border: none;
          border-radius: 10px;
          background-color: #2E7D32;
          color: #FAF7F0;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-book-page button:hover {
          background-color: #1B5E20;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .error-msg {
          color: #B00020;
          font-weight: 600;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
