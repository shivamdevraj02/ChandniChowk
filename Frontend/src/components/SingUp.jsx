import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const SingUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

        try {
            const res = await axios.post('http://localhost:30001/api/auth/signup', {
        name,
        email,
        password,
      });
            alert(res.data.message);
            // after signup redirect to login
            navigate('/SingIn');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup Failed');
    }
  };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="auth-badge">New here?</p>
                <h1>Sign Up</h1>
                <p className="auth-subtitle">Create your account in seconds</p>

                <form className="auth-form" onSubmit={handleSignup}>
                    <label>
                        Full Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                        />
                    </label>

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
                            placeholder="Create a password"
                            required
                        />
                    </label>

                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            required
                        />
                    </label>

                    <button type="submit" className="auth-button">Create Account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/SingIn">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SingUp;