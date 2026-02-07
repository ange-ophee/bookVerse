import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>BookVerse</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/auth">Login</Link>
      </div>
    </nav>
  );
}
