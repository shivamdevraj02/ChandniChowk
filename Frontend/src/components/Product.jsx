import { useNavigate } from 'react-router-dom';
import { money } from '../data/products';

export default function Product({ product, onAdd, onToggleWishlist, isWishlisted }) {
  const navigate = useNavigate();
  const saving = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const buyNow = () => {
    onAdd(product);
    navigate('/checkout');
  };
  return <article className="product-card">
    <div className="product-image-wrap">
      <img src={product.image} alt={product.title} />
      <span className="product-badge">{product.badge}</span>
      <button className={`heart-button ${isWishlisted ? 'is-active' : ''}`} onClick={() => onToggleWishlist(product)} aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}>
        {isWishlisted ? '♥' : '♡'}
      </button>
    </div>
    <div className="product-card-content">
      <div className="rating"><span>★</span> {product.rating} <small>({product.reviews})</small></div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className="price-row">
        <strong>{money(product.price)}</strong>
        <s>{money(product.originalPrice)}</s>
        <em>{saving}% off</em>
      </div>
      <div className="product-actions">
        <button className="button button-dark product-add" onClick={() => onAdd(product)}>Add to bag</button>
        <button className="button button-buy-now" onClick={buyNow}>Buy now <span>→</span></button>
      </div>
    </div>
  </article>;
}
