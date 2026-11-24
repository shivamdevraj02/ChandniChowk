import { Link } from 'react-router-dom';
import Product from './Product';
import { categories, products } from '../data/products';

const benefits = [
  ['✦', 'Made thoughtfully', 'Small-batch craft, honestly sourced.'],
  ['↗', 'Free shipping', 'On orders over ₹1,499, across India.'],
  ['↺', 'Easy returns', 'Seven days to decide, no questions asked.'],
  ['♡', 'Gifting made easy', 'A little note makes it personal.'],
];

export default function HomePage({ addToCart, wishlist, toggleWishlist }) {
  const featured = products.slice(0, 4);
  return <>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">A modern bazaar, rooted in craft</p>
        <h1>Everyday things.<br /><em>Extraordinary stories.</em></h1>
        <p className="hero-text">Thoughtful clothing, gifts and home finds from makers who keep India’s most beautiful traditions alive.</p>
        <div className="hero-actions">
          <Link className="button button-light" to="/shop">Shop the edit <span>→</span></Link>
          <Link className="text-link text-link-light" to="/about">Meet the makers <span>↗</span></Link>
        </div>
        <div className="hero-proof"><span>★★★★★</span> Loved by 12,000+ conscious shoppers</div>
      </div>
      <div className="hero-art" aria-label="Woman wearing a traditional outfit">
        <div className="hero-stamp">CURATED<br />WITH LOVE<br /><b>IN INDIA</b></div>
        <div className="hero-note"><span>01</span><b>New season, old soul</b><small>Discover joyful heirlooms in the making.</small></div>
      </div>
    </section>

    <section className="marquee" aria-label="What we offer"><span>HANDMADE GOODS</span><i>✦</i><span>FRESH FINDS</span><i>✦</i><span>STORIES WORTH SHARING</span><i>✦</i><span>HANDMADE GOODS</span></section>

    <section className="section container category-section">
      <div className="section-heading split-heading"><div><p className="eyebrow">Explore our collections</p><h2>Find your little <em>treasure</em></h2></div><Link className="text-link" to="/shop">Shop everything <span>→</span></Link></div>
      <div className="category-grid">{categories.map((category, index) => <Link className={`category-tile category-${index + 1}`} to={`/category/${category.id}`} key={category.id}>
        <img src={category.image} alt={category.label} /><div><p>{category.eyebrow}</p><h3>{category.label}</h3><span>Explore <b>→</b></span></div>
      </Link>)}</div>
    </section>

    <section className="section container products-section">
      <div className="section-heading split-heading"><div><p className="eyebrow">The week’s favourites</p><h2>Small joys, <em>big feeling</em></h2></div><Link className="text-link" to="/shop">View all products <span>→</span></Link></div>
      <div className="product-grid">{featured.map((product) => <Product key={product.id} product={product} onAdd={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} />)}</div>
    </section>

    <section className="maker-section">
      <div className="maker-image"><img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=85" alt="Artisan at work" /><span className="maker-seal">EST.<br />2026</span></div>
      <div className="maker-copy"><p className="eyebrow">The Chandni Chowk promise</p><h2>Less mass market.<br /><em>More meaning.</em></h2><p>We look beyond the expected to find objects with a sense of place. Every piece brings a craft tradition, a maker’s skill, and a reason to keep it close.</p><Link className="button button-dark" to="/about">Our story <span>→</span></Link><div className="maker-stats"><span><b>100+</b> independent makers</span><span><b>17</b> craft clusters</span></div></div>
    </section>

    <section className="benefits container">{benefits.map(([icon, title, copy]) => <div key={title}><i>{icon}</i><div><h3>{title}</h3><p>{copy}</p></div></div>)}</section>
    <section className="newsletter container"><div><p className="eyebrow">A note from the bazaar</p><h2>Good things come<br /><em>to your inbox.</em></h2></div><div><p>New drops, maker stories and 10% off your first order—occasionally, and always worth opening.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder="Your email address" aria-label="Email address"/><button className="button button-saffron">Sign me up <span>→</span></button></form></div></section>
  </>;
}
