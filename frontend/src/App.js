import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddBookPage from './pages/AddBookPage';
import UserProfilePage from './pages/UserProfilePage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-[#FAF7F0]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
