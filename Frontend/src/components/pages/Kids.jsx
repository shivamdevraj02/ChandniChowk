import { useEffect, useState } from "react";
import Products from "../Product";
import CategoryNav from "../CategoryNav";

const Kids = ({ cart, setCart, wishlist, setWishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products/search?q=shirt")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load products.");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data.products);
            })
            .catch((err) => {
                console.error(err);
                setError("Unable to load products.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <CategoryNav />
            <section className="category-page">
                <div className="category-header">
                    <p className="eyebrow">Kids Collection</p>
                    <h1>Fun essentials for kids</h1>
                    <p>Find playful kids' items and everyday essentials curated for bright, comfortable style.</p>
                </div>

                {loading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}

                {!loading && !error && (
                    <div className="products">
                        {products.map((product) => (
                            <Products
                                key={product.id}
                                id={product.id}
                                image={product.thumbnail}
                                title={product.title}
                                price={product.price}
                                description={product.description}
                                discount={product.discountPercentage}
                                rating={product.rating}
                                cart={cart}
                                setCart={setCart}
                                wishlist={wishlist}
                                setWishlist={setWishlist}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Kids;