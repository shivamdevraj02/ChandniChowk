import { useEffect, useState } from "react";
import Products from "../Product";
import CategoryNav from "../CategoryNav";

const Womens = ({ cart, setCart, wishlist, setWishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products/category/womens-dresses")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <CategoryNav />
            <section className="category-page">
                <div className="category-header">
                    <p className="eyebrow">Women's Collection</p>
                    <h1>Elegant looks for her</h1>
                    <p>Discover stylish women's dresses and accessories chosen for comfort, confidence, and everyday wear.</p>
                </div>

                <div className="products">
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        products.map((product) => (
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
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default Womens;