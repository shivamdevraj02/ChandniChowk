export const categories = [
  { id: 'women', label: 'Women', eyebrow: 'Silhouettes with soul', image: 'https://images.unsplash.com/photo-1610189020382-668a2e1d72e1?auto=format&fit=crop&w=900&q=85' },
  { id: 'men', label: 'Men', eyebrow: 'Everyday heirlooms', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85' },
  { id: 'kids', label: 'Kids', eyebrow: 'Little joys, big colour', image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?auto=format&fit=crop&w=900&q=85' },
  { id: 'home', label: 'Home & decor', eyebrow: 'Made to gather around', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85' },
  { id: 'gifts', label: 'Gifts', eyebrow: 'A little wonder, wrapped', image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=85' },
];

export const products = [
  { id: 'cc-01', title: 'Noor Handblock Kurta', category: 'women', price: 2490, originalPrice: 3290, rating: 4.8, reviews: 126, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85', description: 'Airy cotton, handblock printed in a small Jaipur studio.' },
  { id: 'cc-02', title: 'Old Delhi Silk Stole', category: 'women', price: 1890, originalPrice: 2390, rating: 4.9, reviews: 84, badge: 'Handcrafted', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=900&q=85', description: 'A feather-light silk blend with a jewel-tone border.' },
  { id: 'cc-03', title: 'Indigo Ikat Shirt', category: 'men', price: 2190, originalPrice: 2790, rating: 4.7, reviews: 97, badge: 'New', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85', description: 'A relaxed, handwoven layer for unhurried days.' },
  { id: 'cc-04', title: 'Mitti Ceramic Set', category: 'home', price: 1640, originalPrice: 1980, rating: 4.9, reviews: 61, badge: 'Limited', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85', description: 'Set of two stoneware cups, finished by hand.' },
  { id: 'cc-05', title: 'Gulabi Mini Dress', category: 'kids', price: 1390, originalPrice: 1690, rating: 4.8, reviews: 43, badge: 'New', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=85', description: 'A cheerful cotton dress for tiny celebrations.' },
  { id: 'cc-06', title: 'Brass Diya Pair', category: 'gifts', price: 980, originalPrice: 1190, rating: 4.7, reviews: 204, badge: 'Gift pick', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85', description: 'A warm, thoughtful keepsake for any new beginning.' },
  { id: 'cc-07', title: 'Chikankari Shirt', category: 'men', price: 2790, originalPrice: 3390, rating: 4.8, reviews: 75, badge: 'Handcrafted', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85', description: 'Easy linen cotton with subtle threadwork detail.' },
  { id: 'cc-08', title: 'Marigold Cushion Cover', category: 'home', price: 760, originalPrice: 950, rating: 4.6, reviews: 52, badge: 'Small batch', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85', description: 'A joyful botanical print for your favourite corner.' },
  { id: 'cc-09', title: 'Kantha Sling Bag', category: 'women', price: 1590, originalPrice: 1990, rating: 4.8, reviews: 117, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1585488434455-7b8f2a44f99c?auto=format&fit=crop&w=900&q=85', description: 'Quilted, colourful and made for everyday wandering.' },
  { id: 'cc-10', title: 'Celebration Gift Box', category: 'gifts', price: 1890, originalPrice: 2200, rating: 4.9, reviews: 38, badge: 'Ready to gift', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85', description: 'A fragrant, festive edit ready to delight someone special.' },
];

export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
