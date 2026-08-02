import { Link } from "react-router-dom";
import { logout } from '../utils/auth';

function Navbar({ authenticated, cart = [], wishlist = [] }) {
  const count = Array.isArray(cart) ? cart.length : 0;
  const wishCount = Array.isArray(wishlist) ? wishlist.length : 0;

  return (
    <nav className="navbar">
      <h2>My chandnichowk</h2>

      <ul className="nav-links">
        {authenticated ? (
          <>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/wishlist">Wishlist {wishCount > 0 ? `(${wishCount})` : ''}</Link></li>
            <li><Link to="/cart">Cart {count > 0 ? `(${count})` : ''}</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><button onClick={logout} className="nav-logout">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/SingIn">SingIn</Link></li>
            <li><Link to="/SingUp">SingUp</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;