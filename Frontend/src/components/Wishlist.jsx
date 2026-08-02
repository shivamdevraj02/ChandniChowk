import { Link } from 'react-router-dom';

export default function Wishlist({ wishlist = [], setWishlist, setCart }) {
    const removeItem = (id) => {
        if (!setWishlist) return;
        setWishlist((prev) => (prev || []).filter((p) => p.id !== id));
    };

    const addToCart = (item) => {
        if (!setCart) return;
        setCart((prev) => [...(prev || []), item]);
    };

    if (!Array.isArray(wishlist) || wishlist.length === 0) {
        return (
            <div style={{ padding: 24 }}>
                <h2>Your wishlist is empty</h2>
                <p>
                    Browse products on the <Link to="/">home page</Link> or <Link to="/products">products</Link> and add items to your wishlist.
                </p>
            </div>
        );
    }

    return (
        <section className="wishlist-page" style={{ padding: 24 }}>
            <h2>Your Wishlist</h2>
            <div className="products" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 20 }}>
                {wishlist.map((item) => (
                    <div key={item.id} className="product-card" style={{ background: '#fff', color: '#111', borderRadius: 18, overflow: 'hidden' }}>
                        <div style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
                            <img src={item.image} alt={item.title || item.name} style={{ maxHeight: 160, width: 'auto' }} />
                        </div>
                        <div style={{ padding: 16 }}>
                            <h3 style={{ margin: '6px 0' }}>{item.title || item.name}</h3>
                            <p style={{ color: '#666' }}>{item.description || ''}</p>
                            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                <button className="button" onClick={() => addToCart(item)}>Add to Cart</button>
                                <button className="secondary-button" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
