import { useState, useMemo } from "react";

const Products = ({ id, image, title, price, description, discount, rating, cart, setCart, wishlist, setWishlist }) => {
  const [added, setAdded] = useState(false);
  const isWishlisted = useMemo(() => Array.isArray(wishlist) && wishlist.some((p) => p.id === id), [wishlist, id]);

  function addItem() {
    if (!setCart) return;
    const product = { id, image, title, price, description, discount, rating };
    setCart((prev) => [...(prev || []), product]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function toggleWishlist() {
    if (!setWishlist) return;
    const product = { id, image, title, price, description, discount, rating };
    setWishlist((prev) => {
      const list = prev || [];
      const exists = list.some((p) => p.id === id);
      if (exists) return list.filter((p) => p.id !== id);
      return [...list, product];
    });
  }

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : price;

  return (
    <div className="product-card" style={{ backgroundColor: '#fff', color: '#111', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="image-wrapper" style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '28px', width: '100%' }}>
        <img src={image} alt={title} style={{ backgroundColor: '#fff', width: 'auto', maxWidth: '100%', maxHeight: '220px', borderRadius: '20px', padding: '8px' }} />
      </div>

      <div className="card-body">
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="price-row">
          <div>
            <span className="price-current">₹{price}</span>
            {discount ? <span className="price-original">₹{originalPrice}</span> : null}
          </div>
        </div>

        <div className="card-actions">
          <button className="button" onClick={addItem} disabled={added}>
            {added ? 'Added' : 'Add To Cart'}
          </button>
          <button className={`wishlist-button ${isWishlisted ? 'active' : ''}`} onClick={toggleWishlist}>
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      <div className="card-footer">
        {discount ? <span className="badge discount">-{discount.toFixed(0)}%</span> : null}
        <span className="badge rating">⭐ {rating.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default Products;