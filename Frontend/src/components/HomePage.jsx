import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const heroSlides = [
    {
        title: 'Shop the latest footwear collections',
        description: 'Discover premium styles for every season with fast delivery and easy returns.',
        button: 'Shop Now',
        image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
        title: 'Fresh looks for everyday wear',
        description: 'Find your next favorite outfit with curated deals on top brands.',
        button: 'Explore Styles',
        image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
        title: 'Gear up for the season with new arrivals',
        description: 'Trendy shoes, accessories and essentials delivered right to your door.',
        button: 'View Collection',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
];

const categories = [
    { id: 1, title: 'Sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { id: 2, title: 'Running', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { id: 3, title: 'Casual', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { id: 4, title: 'Sports', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=700' },
    { id: 5, title: 'Accessories', image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { id: 6, title: 'Sale', image: 'https://images.pexels.com/photos/715688/pexels-photo-715688.jpeg?auto=compress&cs=tinysrgb&w=700' },
];

const featuredProducts = [
    {
        id: 1,
        name: 'Nike Air Max',
        price: 4999,
        discount: 15,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 2,
        name: 'Adidas Sneakers',
        price: 3999,
        discount: 10,
        rating: 4.5,
        image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 3,
        name: 'Puma Sports Shoes',
        price: 2999,
        discount: 0,
        rating: 4.3,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
    {
        id: 4,
        name: 'Classic Watch',
        price: 2499,
        discount: 20,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/854262/pexels-photo-854262.jpeg?auto=compress&cs=tinysrgb&w=700',
    },
];

const testimonialsData = [
    {
        id: 1,
        name: 'Priya S.',
        quote: 'Amazing quality and fast delivery. I love the product selection and the checkout was super easy.',
    },
    {
        id: 2,
        name: 'Rahul K.',
        quote: 'Great customer service and the shoes fit perfectly. I will order again for sure.',
    },
    {
        id: 3,
        name: 'Anjali M.',
        quote: 'The website is clean and the product recommendations were spot on. Highly recommended.',
    },
];

function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % heroSlides.length);
        }, 5500);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="home-hero-section">
            <div className="hero-slide" style={{ backgroundImage: `url(${heroSlides[activeIndex].image})` }}>
                <div className="hero-copy">
                    <p className="hero-label">Trending Now</p>
                    <h1>{heroSlides[activeIndex].title}</h1>
                    <p>{heroSlides[activeIndex].description}</p>
                    <Link to="/products" className="hero-cta">
                        {heroSlides[activeIndex].button}
                    </Link>
                </div>
            </div>
            <div className="hero-dots">
                {heroSlides.map((slide, index) => (
                    <button
                        key={slide.title}
                        type="button"
                        className={index === activeIndex ? 'hero-dot active' : 'hero-dot'}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
}

function CategoriesSection() {
    return (
        <section className="categories-section">
            <div className="section-header">
                <p className="section-kicker">Shop by category</p>
                <h2>Find the right style for every occasion</h2>
            </div>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                        <img src={category.image} alt={category.title} />
                        <div className="category-card-body">
                            <h3>{category.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProductCard({ product, onAdd, onToggleWishlist, isWishlisted }) {
    const discountedPrice = product.discount
        ? product.price - Math.round((product.price * product.discount) / 100)
        : product.price;
    const [added, setAdded] = useState(false);

    function handleAdd() {
        if (onAdd) onAdd(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
    }

    return (
        <div className="product-card">
            <div className="image-wrapper" style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12 }}>
                <img src={product.image} alt={product.name} style={{ backgroundColor: '#fff', maxHeight: 180, width: 'auto' }} />
            </div>
            <div className="product-card-body">
                <div className="product-card-top">
                    <h3>{product.name}</h3>
                    <button
                        className={isWishlisted ? "wishlist active" : "wishlist"}
                        type="button"
                        onClick={() => {
                            onToggleWishlist();
                            alert(
                                isWishlisted
                                    ? "Item removed from wishlist 💔"
                                    : "Item added to wishlist ❤️"
                            );
                        }}
                    >
                        ♥
                    </button>

                </div>
                <div className="product-price-row">
                    <span className="product-price">₹{discountedPrice}</span>
                    {product.discount ? <span className="product-original">₹{product.price}</span> : null}
                </div>
                <div className="product-rating">{product.rating} ★</div>
                <button type="button" className="add-cart-button" onClick={handleAdd} disabled={added}>
                    {added ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}

function DealsBanner() {
    const [timeLeft, setTimeLeft] = useState(3600 * 4);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((current) => (current > 0 ? current - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <section className="deals-banner">
            <div>
                <p className="section-kicker">Limited-time deal</p>
                <h2>Extra savings on bestselling styles</h2>
                <p>Hurry, these deals will end soon. Refresh your wardrobe with smart picks today.</p>
            </div>
            <div className="deal-countdown">
                <span>{formatTime(timeLeft)}</span>
            </div>
        </section>
    );
}

// function TestimonialsSection() {
//     const [active, setActive] = useState(0);

//     return (
//         <section className="testimonials-section">
//             <div className="section-header">
//                 <p className="section-kicker">Customer stories</p>
//                 <h2>What shoppers are saying</h2>
//             </div>
//             <div className="testimonials-grid">
//                 {testimonialsData.map((testimonial, index) => (
//                     <div
//                         key={testimonial.id}
//                         className={index === active ? 'testimonial-card active' : 'testimonial-card'}
//                     >
//                         <p>“{testimonial.quote}”</p>
//                         <h4>{testimonial.name}</h4>
//                     </div>
//                 ))}
//             </div>
//             <div className="testimonial-controls">
//                 {testimonialsData.map((item, index) => (
//                     <button
//                         key={item.id}
//                         type="button"
//                         className={index === active ? 'testimonial-dot active' : 'testimonial-dot'}
//                         onClick={() => setActive(index)}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// }



export default function HomePage({ cart, setCart, wishlist, setWishlist }) {
    const addToCart = (product) => {
        if (setCart) {
            setCart((prev) => [...(prev || []), product]);
        }
    };

    const toggleWishlist = (product) => {
        if (!setWishlist) return;
        setWishlist((prev) => {
            const list = prev || [];
            const exists = list.some((p) => p.id === product.id);
            if (exists) return list.filter((p) => p.id !== product.id);
            return [...list, { id: product.id, image: product.image, name: product.name, price: product.price, discount: product.discount, rating: product.rating }];
        });
    };

    const productCount = useMemo(() => featuredProducts.length, []);

    return (
        <div className="homepage-container">
            <HeroSlider />
            <CategoriesSection />
            <section className="featured-section">
                <div className="section-header">
                    <p className="section-kicker">Featured products</p>
                    <h2>Popular picks this week</h2>
                </div>
                <div className="products-grid">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={addToCart}
                            isWishlisted={Array.isArray(wishlist) && wishlist.some((p) => p.id === product.id)}
                            onToggleWishlist={() => toggleWishlist(product)}
                        />
                    ))}
                </div>
                <p className="featured-summary">Showing {productCount} top products for you</p>
            </section>
            <DealsBanner />
            {/* <TestimonialsSection /> */}

            <div className="cart-summary">Cart items added: {Array.isArray(cart) ? cart.length : 0}</div>
        </div>
    );
}


