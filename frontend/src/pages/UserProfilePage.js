import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getBooks } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function UserProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  // Load user's books ONLY if logged in
  useEffect(() => {
    if (!user) {
      setMyBooks([]);
      return;
    }

    getBooks().then(res => {
      const userBooks = res.data.filter(
        book => book.addedBy === user._id
      );
      setMyBooks(userBooks);
    });
  }, [user]);

  /* =====================
     LOGGED OUT VIEW
     ===================== */
  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="profile-header">
          <h1>You are not logged in</h1>
          <p>Login or register to access your profile and books.</p>

          <button
            className="auth-btn"
            onClick={() => navigate('/login')}
          >
            Login / Register
          </button>
        </div>

        <style>{styles}</style>
      </div>
    );
  }

  /* =====================
     LOGGED IN VIEW
     ===================== */

  const profilePic =
    user.profilePic ||
    `https://ui-avatars.com/api/?name=${user.username}&background=2E7D32&color=fff`;

  return (
    <div className="user-profile-page">
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h1>Hi, {user.username} 👋</h1>
        <p>{user.email}</p>

        <div className="stats">
          <div>
            <strong>{myBooks.length}</strong>
            <span>Books Added</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>

      {/* USER BOOKS */}
      <div className="my-books">
        <h2>Your Books</h2>

        {myBooks.length === 0 ? (
          <p>You haven’t added any books yet.</p>
        ) : (
          <div className="book-grid">
            {myBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>

      <style>{styles}</style>
    </div>
  );
}

/* =====================
   STYLES
   ===================== */

const styles = `
.user-profile-page {
  max-width: 1100px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #FAF7F0;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}

.profile-header {
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 2px solid #E6E1D9;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #2E7D32;
}

.profile-header h1 {
  font-size: 2.4rem;
  color: #2E7D32;
}

.profile-header p {
  color: #555;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.stats div {
  background: #E6E1D9;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
}

.stats strong {
  font-size: 1.4rem;
  color: #2E7D32;
}

.profile-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.profile-buttons button,
.auth-btn {
  padding: 0.7rem 1.6rem;
  border-radius: 10px;
  border: none;
  background-color: #2E7D32;
  color: #FAF7F0;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.profile-buttons button:hover,
.auth-btn:hover {
  background-color: #1B5E20;
}

.my-books {
  margin-top: 2.5rem;
}

.my-books h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.8rem;
}
`;
