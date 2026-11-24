import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../utils/auth';

export default function Navbar({ authenticated, cart = [], wishlist = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
    setMenuOpen(false);
  };

  return <>
    <div className="announcement-bar">Complimentary shipping on orders above ₹1,499 <span>·</span> Made with care, from India</div>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Chandni Chowk home"><span>chandni</span> chowk<i>.</i></Link>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">{menuOpen ? '×' : '☰'}</button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <NavLink end to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop all</NavLink>
          <NavLink to="/category/women" onClick={() => setMenuOpen(false)}>Women</NavLink>
          <NavLink to="/category/men" onClick={() => setMenuOpen(false)}>Men</NavLink>
          <NavLink to="/category/home" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>Our story</NavLink>
        </nav>
        <div className="header-actions">
          <form className="header-search" onSubmit={submitSearch}>
            <input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the bazaar" />
            <button aria-label="Search">⌕</button>
          </form>
          <Link className="header-icon account-link" to={authenticated ? '/' : '/sign-in'} aria-label="Account">♙</Link>
          <Link className="header-icon" to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}>♡{wishlist.length > 0 && <b>{wishlist.length}</b>}</Link>
          <Link className="header-icon" to="/cart" aria-label={`Cart with ${cartCount} items`}>Bag{cartCount > 0 && <b>{cartCount}</b>}</Link>
          {authenticated && <button className="logout-link" onClick={logout}>Log out</button>}
        </div>
      </div>
    </header>
  </>;
}
