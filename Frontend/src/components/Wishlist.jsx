import { Link } from 'react-router-dom';
import Product from './Product';

export default function Wishlist({ wishlist, addToCart, toggleWishlist }) {
  if (!wishlist.length) return <section className="empty-state page-space"><div>♡</div><p className="eyebrow">Your saved collection</p><h1>Save the things you love.</h1><p>Keep a little list of pieces that caught your eye, ready for whenever the moment is right.</p><Link className="button button-dark" to="/shop">Discover something special <span>→</span></Link></section>;
  return <section className="container page-space"><div className="page-heading"><p className="eyebrow">Your saved collection</p><h1>Wishlist <span>({wishlist.length})</span></h1><p>All the pieces that sparked a little joy.</p></div><div className="product-grid catalog-grid">{wishlist.map((product) => <Product key={product.id} product={product} onAdd={addToCart} onToggleWishlist={toggleWishlist} isWishlisted />)}</div></section>;
}
