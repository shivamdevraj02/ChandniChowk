import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { money, products } from '../data/products';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:30001';
const productsById = new Map(products.map((product) => [product.id, product]));
let razorpayScriptPromise;

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = () => {
        razorpayScriptPromise = undefined;
        reject(new Error('Could not load Razorpay. Check your connection and try again.'));
      };
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}

function getPaymentError(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ERR_NETWORK') return 'Cannot reach the payment server. Make sure the Backend is running on port 30001.';
  return error.message || 'Unable to start payment. Please try again.';
}

export default function Checkout({ cart, clearCart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedPayment, setCompletedPayment] = useState(null);
  const subtotal = cart.reduce((sum, item) => sum + (productsById.get(item.id)?.price ?? item.price) * item.quantity, 0);
  const shipping = subtotal >= 1499 ? 0 : 99;
  const total = subtotal + shipping;

  const startPayment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customer = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`.trim(),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('pincode'),
    };
    setLoading(true);
    setError('');

    try {
      const { data: order } = await axios.post(`${apiUrl}/api/payments/order`, {
        items: cart.map(({ id, quantity }) => ({ id, quantity })),
        customer,
      });
      await loadRazorpay();

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Chandni Chowk',
        description: 'Your curated order',
        order_id: order.orderId,
        handler: async (payment) => {
          try {
            const { data } = await axios.post(`${apiUrl}/api/payments/verify`, payment);
            setCompletedPayment(data.paymentId);
            clearCart();
          } catch (verificationError) {
            setError(verificationError.response?.data?.message || 'Payment was received but could not be verified. Please contact support before trying again.');
          } finally {
            setLoading(false);
          }
        },
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        theme: { color: '#9d341e' },
        modal: { ondismiss: () => setLoading(false) },
      });
      checkout.on('payment.failed', (failure) => {
        setError(failure.error?.description || 'Payment failed. Please try again.');
        setLoading(false);
      });
      checkout.open();
    } catch (paymentError) {
      setError(getPaymentError(paymentError));
      setLoading(false);
    }
  };

  if (completedPayment) {
    return <section className="container checkout-page page-space">
      <div className="payment-success-backdrop" role="dialog" aria-modal="true" aria-labelledby="payment-success-title">
        <div className="payment-success">
          <span className="payment-success-icon" aria-hidden="true">✓</span>
          <p className="eyebrow">Payment confirmed</p>
          <h1 id="payment-success-title">Thank you for your order.</h1>
          <p>Your payment was successful. Payment ID: <strong>{completedPayment}</strong></p>
          <Link className="button button-saffron" to="/shop">Continue shopping <span>→</span></Link>
        </div>
      </div>
    </section>;
  }

  if (!cart.length) return <section className="empty-state page-space"><h1>Your bag is ready when you are.</h1><Link className="button button-dark" to="/shop">Go shopping</Link></section>;

  return <section className="container checkout-page page-space">
    <div className="page-heading"><p className="eyebrow">Almost there</p><h1>Checkout</h1><p>Complete your details and pay securely with Razorpay.</p></div>
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={startPayment}>
        <div className="form-section">
          <h2>Contact details</h2>
          <div className="two-col">
            <label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label>
            <label>Phone number<input name="phone" required type="tel" placeholder="+91 98765 43210" /></label>
          </div>
        </div>
        <div className="form-section">
          <h2>Delivery address</h2>
          <div className="two-col">
            <label>First name<input name="firstName" required placeholder="First name" /></label>
            <label>Last name<input name="lastName" required placeholder="Last name" /></label>
          </div>
          <label>Address<input name="address" required placeholder="House number, street and area" /></label>
          <div className="three-col">
            <label>City<input name="city" required placeholder="New Delhi" /></label>
            <label>State<input name="state" required placeholder="Delhi" /></label>
            <label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" placeholder="110006" /></label>
          </div>
        </div>
        <div className="form-section">
          <h2>Payment</h2>
          <div className="payment-choice"><span><b>Razorpay secure checkout</b><small>Pay by UPI, card, netbanking or wallet.</small></span></div>
        </div>
        {error && <p className="form-status" role="alert">{error}</p>}
        <button className="button button-saffron" disabled={loading} type="submit">
          {loading ? 'Connecting to Razorpay…' : <>Pay {money(total)} <span>→</span></>}
        </button>
      </form>
      <aside className="order-summary">
        <h3>Your order</h3>
        {cart.map((item) => {
          const product = productsById.get(item.id) || item;
          const price = productsById.get(item.id)?.price ?? item.price;
          return <div className="checkout-item" key={item.id}>
            <img src={product.image} alt="" />
            <span>{product.title}<small>Qty {item.quantity}</small></span>
            <b>{money(price * item.quantity)}</b>
          </div>;
        })}
        <div><span>Subtotal</span><b>{money(subtotal)}</b></div>
        <div><span>Shipping</span><b>{shipping ? money(shipping) : 'Free'}</b></div>
        <div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div>
      </aside>
    </div>
  </section>;
}
