import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import About from './components/About';
import SignIn from './components/SingIn';
import SignUp from './components/SingUp';
import Checkout from './components/Checkout';
import { isAuthenticated } from './utils/auth';
import './App.css';

const readLocal = (key) => {
  try {
    const items = JSON.parse(localStorage.getItem(key)) || [];
    return key === 'chandni-cart' ? items.map((item) => ({ ...item, quantity: item.quantity || 1 })) : items;
  } catch { return []; }
};

function App() {
  const [cart, setCart] = useState(() => readLocal('chandni-cart'));
  const [wishlist, setWishlist] = useState(() => readLocal('chandni-wishlist'));
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const syncAuth = () => setAuthenticated(isAuthenticated());
    window.addEventListener('authchange', syncAuth);
    window.addEventListener('storage', syncAuth);
    return () => { window.removeEventListener('authchange', syncAuth); window.removeEventListener('storage', syncAuth); };
  }, []);
  useEffect(() => localStorage.setItem('chandni-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('chandni-wishlist', JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product) => setCart((items) => {
    const existing = items.find((item) => item.id === product.id);
    return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }];
  });
  const updateQuantity = (id, amount) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item).filter((item) => item.quantity > 0));
  const toggleWishlist = (product) => setWishlist((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product]);
  const clearCart = () => setCart([]);
  const sharedProps = { cart, wishlist, addToCart, toggleWishlist };

  return <div className="site-shell">
    <Navbar cart={cart} wishlist={wishlist} authenticated={authenticated} />
    <main><Routes>
      <Route path="/" element={<HomePage {...sharedProps} />} />
      <Route path="/shop" element={<ProductsPage {...sharedProps} />} />
      <Route path="/products" element={<Navigate to="/shop" replace />} />
      <Route path="/category/:category" element={<ProductsPage {...sharedProps} />} />
      <Route path="/pages/Mens" element={<Navigate to="/category/men" replace />} />
      <Route path="/pages/Womens" element={<Navigate to="/category/women" replace />} />
      <Route path="/pages/Kids" element={<Navigate to="/category/kids" replace />} />
      <Route path="/pages/Electronics" element={<Navigate to="/category/home" replace />} />
      <Route path="/pages/Grociries" element={<Navigate to="/category/gifts" replace />} />
      <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
      <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
      <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={authenticated ? <Navigate to="/" replace /> : <SignIn />} />
      <Route path="/sign-up" element={authenticated ? <Navigate to="/" replace /> : <SignUp />} />
      <Route path="/SingIn" element={<Navigate to="/sign-in" replace />} />
      <Route path="/SingUp" element={<Navigate to="/sign-up" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></main>
    <Footer />
  </div>;
}

export default App;
