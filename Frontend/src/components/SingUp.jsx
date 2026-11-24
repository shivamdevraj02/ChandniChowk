import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:30001';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault(); setStatus('');
    if (form.password !== form.confirmPassword) { setStatus('The passwords do not match.'); return; }
    setLoading(true);
    try { await axios.post(`${apiUrl}/api/auth/signup`, { name: form.name, email: form.email, password: form.password }); navigate('/sign-in', { state: { message: 'Account created. Please sign in to continue.' } }); }
    catch (error) { setStatus(error.response?.data?.message || 'We could not reach the server. Start the backend, then try again.'); }
    finally { setLoading(false); }
  };
  return <section className="auth-layout auth-layout-reverse"><aside className="auth-art"><p className="eyebrow">A beautiful way to shop small</p><h1>Come find<br />something <em>special.</em></h1><div className="auth-quote">Join a community that chooses character over convention.</div></aside><div className="auth-panel"><div className="auth-form-wrap"><Link className="brand auth-brand" to="/"><span>chandni</span> chowk<i>.</i></Link><p className="eyebrow">Create your account</p><h2>Let’s get acquainted</h2><p className="form-intro">A few details and you’re ready to explore.</p><form onSubmit={handleSubmit}><label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your name" required /></label><label>Email address<input name="email" value={form.email} onChange={update} type="email" placeholder="you@example.com" required /></label><label>Password<input name="password" value={form.password} onChange={update} type="password" placeholder="Create a password" minLength="6" required /></label><label>Confirm password<input name="confirmPassword" value={form.confirmPassword} onChange={update} type="password" placeholder="Repeat your password" required /></label>{status && <p className="form-status" role="alert">{status}</p>}<button className="button button-dark" disabled={loading}>{loading ? 'Creating account…' : <>Create account <span>→</span></>}</button></form><p className="auth-switch">Already have an account? <Link to="/sign-in">Sign in</Link></p></div></div></section>;
}
