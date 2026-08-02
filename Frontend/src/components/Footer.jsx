import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <h2>ShopEase</h2>
          <p>Premium products, secure shopping, and fast delivery every day.</p>
        </div>

        <div className="footer-newsletter">
          <input type="email" placeholder="Your email address" />
          <button type="button">Subscribe</button>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>About</h3>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3>Customer Care</h3>
          <ul>
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Shipping & Delivery</Link></li>
            <li><Link to="/">Returns & Refunds</Link></li>
          </ul>
        </div>

        <div>
          <h3>Popular Categories</h3>
          <ul>
            <li><Link to="/products">Electronics</Link></li>
            <li><Link to="/products">Fashion</Link></li>
            <li><Link to="/products">Home Essentials</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li><Link to="/">support@shopease.com</Link></li>
            <li><Link to="/">+1 (800) 555-0199</Link></li>
            <li><Link to="/">24/7 Support</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ShopEase. All rights reserved.</span>
        <span>Secure Checkout • Fast Dispatch • Trusted Service</span>
      </div>
    </footer>
  );
};

export default Footer;