const crypto = require('crypto');
const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();
const productPrices = {
  'cc-01': 2490,
  'cc-02': 1890,
  'cc-03': 2190,
  'cc-04': 1640,
  'cc-05': 1390,
  'cc-06': 980,
  'cc-07': 2790,
  'cc-08': 760,
  'cc-09': 1590,
  'cc-10': 1890,
};
const shippingThreshold = 1499;
const shippingFee = 99;

function getRazorpay() {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
}

router.post('/order', async (req, res, next) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) return res.status(503).json({ message: 'Online payments are not configured.' });

    const { items, customer } = req.body;
    if (!Array.isArray(items) || items.length === 0 || items.length > Object.keys(productPrices).length) {
      return res.status(400).json({ message: 'Your bag is empty or invalid.' });
    }
    const customerFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    if (!customer || customerFields.some((field) => typeof customer[field] !== 'string' || !customer[field].trim())
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
      || !/^\d{6}$/.test(customer.pincode)) {
      return res.status(400).json({ message: 'Enter valid contact and delivery details.' });
    }

    let subtotal = 0;
    const seenIds = new Set();
    for (const item of items) {
      if (!item || typeof item.id !== 'string' || seenIds.has(item.id)
        || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10
        || !Object.hasOwn(productPrices, item.id)) {
        return res.status(400).json({ message: 'Your bag contains an invalid item.' });
      }
      seenIds.add(item.id);
      subtotal += productPrices[item.id] * item.quantity;
    }

    const amount = (subtotal + (subtotal >= shippingThreshold ? 0 : shippingFee)) * 100;
    const notes = {
      customer_name: customer.name.trim().slice(0, 256),
      email: customer.email.trim().slice(0, 256),
      phone: customer.phone.trim().slice(0, 256),
      address: customer.address.trim().slice(0, 256),
      city: customer.city.trim().slice(0, 256),
      state: customer.state.trim().slice(0, 256),
      pincode: customer.pincode,
      items: items.map(({ id, quantity }) => `${id} x ${quantity}`).join(', '),
    };
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `cc_${crypto.randomUUID().replace(/-/g, '')}`,
      notes,
    });

    return res.status(201).json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return res.status(503).json({ message: 'Online payments are not configured.' });
  if (typeof orderId !== 'string' || typeof paymentId !== 'string'
    || typeof signature !== 'string' || !/^[a-f\d]{64}$/i.test(signature)) {
    return res.status(400).json({ message: 'Payment verification details are invalid.' });
  }

  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest();
  const received = Buffer.from(signature, 'hex');
  if (!crypto.timingSafeEqual(expected, received)) {
    return res.status(400).json({ message: 'Payment could not be verified.' });
  }
  return res.json({ verified: true, paymentId });
});

module.exports = router;
