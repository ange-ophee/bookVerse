import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>BookVerse</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add-book">Add Book</Link>
        {user ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>

      <style>{`
        .navbar {
          background-color: #356859;
          color: #FAF7F0;
          padding: 0.8rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .navbar a {
          color: #FAF7F0;
          margin-left: 1rem;
          text-decoration: none;
          font-weight: bold;
        }

        .navbar a:hover {
          color: #D9C9B6;
        }
      `}</style>
    </nav>
  );
}
