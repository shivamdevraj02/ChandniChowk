import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:30001';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); setLoading(true); setStatus('');
    try { const { data } = await axios.post(`${apiUrl}/api/auth/login`, { email, password }); setAuthToken(data.token); navigate('/'); }
    catch (error) { setStatus(error.response?.data?.message || 'We could not reach the server. Start the backend, then try again.'); }
    finally { setLoading(false); }
  };
  return <section className="auth-layout"><aside className="auth-art"><p className="eyebrow">A considered life, one find at a time</p><h1>Welcome back<br />to the <em>bazaar.</em></h1><div className="auth-quote">“The best kind of shopping feels like a beautiful discovery.”</div></aside><div className="auth-panel"><div className="auth-form-wrap"><Link className="brand auth-brand" to="/"><span>chandni</span> chowk<i>.</i></Link><p className="eyebrow">Welcome back</p><h2>Sign in to your account</h2><p className="form-intro">Your saved pieces and bag are waiting for you.</p><form onSubmit={handleSubmit}><label>Email address<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" required /></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Your password" required /></label><div className="form-meta"><label className="checkbox-label"><input type="checkbox" /> Keep me signed in</label><a href="#forgot">Forgot password?</a></div>{status && <p className="form-status" role="alert">{status}</p>}<button className="button button-dark" disabled={loading}>{loading ? 'Signing you in…' : <>Sign in <span>→</span></>}</button></form><p className="auth-switch">New to Chandni Chowk? <Link to="/sign-up">Create an account</Link></p></div></div></section>;
}
