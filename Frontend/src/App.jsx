import './App.css'
import Navbar from './components/navbar'
import Products from './components/Product'
import About from './components/About'
import Cart from './components/Cart'
import HomePage from './components/HomePage'
import SingIn from './components/SingIn'
import SingUp from './components/SingUp'
import Footer from './components/Footer'
import ProductsPage from "./components/ProductsPage";

import Electronics from './components/pages/Electronics'
import Grociries from './components/pages/Grociries'
import Kids from './components/pages/Kids'
import Womens from './components/pages/Womens'
import Mens from './components/pages/Mens'
import Wishlist from './components/Wishlist'


import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from './utils/auth';

import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [authReady, setAuthReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const syncAuth = () => {
      setAuthenticated(isAuthenticated());
      setAuthReady(true);
    };

    syncAuth();
    window.addEventListener('authchange', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('authchange', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      // ignore write errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
      // ignore write errors
    }
  }, [wishlist]);

  if (!authReady) {
    return null;
  }

  return (
    <>
      <Navbar authenticated={authenticated} cart={cart} wishlist={wishlist} />

      <Routes>
        <Route
          path="/products"
          element={authenticated ? <ProductsPage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} /> : <Navigate to="/SingIn" replace />}
        />


        <Route path="/pages/Mens" element={<Mens cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/pages/Womens" element={<Womens cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/pages/Kids" element={<Kids cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/pages/Electronics" element={<Electronics cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/pages/Grociries" element={<Grociries cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />




        <Route
          path="/cart"
          element={authenticated ? <Cart cart={cart} /> : <Navigate to="/SingIn" replace />}
        />

        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} setCart={setCart} />} />

        <Route path="/about" element={authenticated ? <About /> : <Navigate to="/SingIn" replace />} />


        <Route path="/" element={<HomePage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/SingIn" element={!authenticated ? <SingIn /> : <Navigate to="/" replace />} />
        <Route path="/SingUp" element={!authenticated ? <SingUp /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;