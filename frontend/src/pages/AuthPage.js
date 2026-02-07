import { useState, useContext } from 'react';
import { login as loginAPI, register as registerAPI } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = isRegister
        ? await registerAPI({
            username: form.username,
            email: form.email,
            password: form.password,
          })
        : await loginAPI({
            email: form.email,
            password: form.password,
          });

      login(response.data);
      navigate('/profile'); // REDIRECT TO PROFILE
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>BookVerse</h1>
        <p>
          A quiet, thoughtful place for readers to share perspectives,
          discover books, and leave meaningful impressions.
        </p>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isRegister ? 'Create an account' : 'Welcome back'}</h2>

          {isRegister && (
            <input
              className="auth-input"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          )}
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {isRegister && (
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          )}

          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </span>

          <button className="auth-button">
            {isRegister ? 'Create Account' : 'Login'}
          </button>

          <p className="auth-switch" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : 'New here? Create an account'}
          </p>
        </form>
      </div>

      <style>{`
        .auth-container { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .auth-left { padding: 5rem; background: linear-gradient(120deg,#264e47,#2b465a); color: #f4f1ea; display:flex;flex-direction:column;justify-content:center; }
        .auth-right { padding:5rem; background:#f7f5ef; display:flex;align-items:center; justify-content:center; }
        .auth-card { width:100%; max-width:420px; display:flex; flex-direction:column; }
        .auth-input { width:100%; padding:0.85rem; margin-bottom:1.2rem; border-radius:10px; border:1px solid #c9c6bd; }
        .auth-button { padding:0.95rem; border:none; border-radius:12px; background:#3f5f4a; color:#f7f5ef; font-weight:600; cursor:pointer; margin-top:1rem; }
        .auth-button:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.15);}
        .auth-switch { text-align:center; margin-top:1.5rem; cursor:pointer; color:#6b705c;}
        .password-toggle { cursor:pointer; color:#3f5f4a; font-size:0.85rem; margin-bottom:1rem; display:inline-block; }
        @media(max-width:900px){ .auth-container { grid-template-columns: 1fr; } .auth-left { display:none; } .auth-right { padding:3rem 2rem; } }
      `}</style>
    </div>
  );
}
