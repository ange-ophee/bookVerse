import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getBooks } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function UserProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getBooks().then(res => {
        const userBooks = res.data.filter(book => book.addedBy === user._id);
        setMyBooks(userBooks);
      });
    }
  }, [user]);

  // Temporary default profile picture
  const profilePic = user?.profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx-3n6kFSRFQDppN-3xRfiON80XUH57BcL_w&s' + user?.email;

  return (
    <div className="user-profile-page">
      {/* PROFILE HEADER */}
      <div className="profile-header">
        <img className="profile-pic" src={profilePic} alt="Profile" />
        <h1>Hi, {user?.username}!</h1>
        <p>Email: {user?.email}</p>
        <div className="stats">
          <div>
            <strong>{myBooks.length}</strong>
            <span>Books Added</span>
          </div>
        </div>
        <div className="profile-buttons">
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate('/')}>Back to Homepage</button>
        </div>
      </div>

      {/* USER BOOKS */}
      <div className="my-books">
        <h2>Books You've Added</h2>
        {myBooks.length === 0 ? (
          <p>You haven't added any books yet.</p>
        ) : (
          <div className="book-grid">
            {myBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* STYLES */}
      <style>{`
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
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 3px solid #2E7D32;
        }

        .profile-header h1 {
          font-size: 2.5rem;
          color: #2E7D32;
          margin-bottom: 0.3rem;
        }

        .profile-header p {
          color: #5A5A5A;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .stats div {
          background: #E6E1D9;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          text-align: center;
          min-width: 120px;
        }

        .stats strong {
          display: block;
          font-size: 1.4rem;
          color: #2E7D32;
        }

        .stats span {
          font-size: 0.95rem;
          color: #5A5A5A;
        }

        .profile-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .profile-buttons button {
          padding: 0.7rem 1.6rem;
          border-radius: 10px;
          border: none;
          background-color: #2E7D32;
          color: #FAF7F0;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s all;
        }

        .profile-buttons button:hover {
          background-color: #1B5E20;
          transform: translateY(-2px);
        }

        .my-books {
          margin-top: 2rem;
        }

        .my-books h2 {
          font-size: 2rem;
          color: #2F3E34;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .book-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
        }

        @media(max-width:1024px){
          .book-grid { grid-template-columns: repeat(2,1fr); }
        }

        @media(max-width:640px){
          .book-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
