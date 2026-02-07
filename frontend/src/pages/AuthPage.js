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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Segoe UI', system-ui, sans-serif;
          background-color: #0f1f17;
        }

        .auth-container {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* LEFT PANEL */
        .auth-left {
            padding: 5rem 6rem;
            background: linear-gradient(
                120deg,
                #264e47,   /* forest green */
                #2b465a,   /* cozy dark blue */
                #264e47,   /* forest green */
                #2b465a   /* cozy dark blue */
            );
            background-size: 400% 400%;
            animation: gradientFlow 3s ease infinite;
            color: #f4f1ea;
            display: flex;
            flex-direction: column;
            justify-content: center;
            }

        .auth-left h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
        }

        .auth-left p {
          max-width: 420px;
          line-height: 1.7;
          color: #d9d3c7;
          font-size: 1.05rem;
        }

        /* RIGHT PANEL */
        .auth-right {
          padding: 5rem 6rem;
          background: #f7f5ef;
          display: flex;
          align-items: center;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
        }

        .auth-title {
          font-size: 2rem;
          color: #2f3e34;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          color: #6b705c;
          margin-bottom: 2.5rem;
          font-size: 0.95rem;
        }

        .auth-input {
          width: 100%;
          padding: 0.85rem 0.9rem;
          margin-bottom: 1.2rem;
          border-radius: 10px;
          border: 1px solid #c9c6bd;
          font-size: 1rem;
          background: #fff;
        }

        .auth-input:focus {
          outline: none;
          border-color: #3f5f4a;
          box-shadow: 0 0 0 3px rgba(63, 95, 74, 0.2);
        }

        .password-toggle {
          display: inline-block;
          margin-bottom: 1.4rem;
          font-size: 0.85rem;
          cursor: pointer;
          color: #3f5f4a;
        }

        .auth-button {
          width: 100%;
          padding: 0.95rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #3f5f4a, #2f4f3a);
          color: #f7f5ef;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .auth-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .auth-switch {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: #6b705c;
          cursor: pointer;
        }

        .auth-switch:hover {
          color: #2f3e34;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .auth-container {
            grid-template-columns: 1fr;
          }

          .auth-left {
            display: none;
          }

          .auth-right {
            padding: 3rem 2rem;
          }
        }
        @keyframes gradientFlow {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
        }

      `}</style>

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
            <h2 className="auth-title">
              {isRegister ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="auth-subtitle">
              {isRegister
                ? 'Join BookVerse and start reviewing books'
                : 'Sign in to continue your reading journey'}
            </p>

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
              placeholder="Email address"
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
                placeholder="Confirm password"
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
              {isRegister ? 'Create account' : 'Login'}
            </button>

            <p
              className="auth-switch"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? 'Already have an account? Login'
                : 'New here? Create an account'}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
