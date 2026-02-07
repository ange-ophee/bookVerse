import { useState, useContext } from 'react';
import { addBook } from '../services/bookService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AddBookPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', summary: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(form)
      .then(res => navigate(`/books/${res.data._id}`))
      .catch(err => console.error(err));
  };

  if (!user) return <p className="p-4 text-[#4E342E]">Please log in to add books.</p>;

  return (
    <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="author" placeholder="Author" required />
        <textarea name="summary" placeholder="Summary" required />
        <button type="submit" className="btn">Add Book</button>
    </form>

  );
}
