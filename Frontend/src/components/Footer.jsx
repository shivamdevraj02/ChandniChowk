import { Link } from 'react-router-dom';

export default function Footer() {
  return
  <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link className="brand" to="/">
          <span>chandni</span> chowk<i>.</i></Link>
        <p>A modern marketplace for things with stories—made thoughtfully, found joyfully.</p>
        <div className="socials"><a href="https://www.instagram.com" target="_blank" rel="noreferrer">ig</a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">pi</a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">fb</a>
        </div></div><div><h3>Shop</h3>
        <Link to="/shop">The full edit</Link>
        <Link to="/category/women">For her</Link>
        <Link to="/category/men">For him</Link>
        <Link to="/category/home">For home</Link>
      </div>
      <div>
        <h3>About</h3>
        <Link to="/about">Our story</Link>
        <Link to="/about">Our makers</Link>
        <Link to="/about">Journal</Link>
        <Link to="/about">Careers</Link></div>
      <div><h3>Need help?</h3>
        <a href="mailto:hello@chandnichowk.store">hello@chandnichowk.store</a>
        <Link to="/about">Shipping & returns</Link>
        <Link to="/about">Contact us</Link><Link to="/about">FAQs</Link></div></div>
    <div className="container footer-bottom">
      <span>© 2026 Chandni Chowk. Made with intention.</span>
      <span>Privacy · Terms · Accessibility</span>
    </div>
  </footer>;
}
