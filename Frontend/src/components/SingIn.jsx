import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';

const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:30001/api/auth/login', {
        email,
        password,
      });

      setAuthToken(res.data.token);
      alert('Login Successful');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login Failed');
    }
  };





    return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="auth-badge">Welcome back</p>
                <h1>Log In</h1>
                <p className="auth-subtitle">Sign in to continue shopping</p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </label>

                    <button type="submit" className="auth-button">Log In</button>
                </form>

                <p className="auth-footer">
                    Don’t have an account? <Link to="/SingUp">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default SingIn;