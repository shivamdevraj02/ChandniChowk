import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Products from "./Product";

function ProductsPage({ cart, setCart, wishlist, setWishlist }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="category-nav">
        <Link to="/pages/Mens">Mens</Link>
        <Link to="/pages/Womens">Womens</Link>
        <Link to="/pages/Kids">Kids</Link>
        <Link to="/pages/Electronics">Electronics</Link>
        <Link to="/pages/Grociries">Groceries</Link>
      </div>

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
    </>
  );
}

export default ProductsPage;