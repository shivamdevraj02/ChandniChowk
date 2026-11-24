import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Product from './Product';
import { categories, products } from '../data/products';

export default function ProductsPage({ addToCart, wishlist, toggleWishlist }) {
  const { category } = useParams();
  const { search } = useLocation();
  const [sort, setSort] = useState('featured');
  const term = new URLSearchParams(search).get('q')?.toLowerCase() || '';
  const categoryData = categories.find((item) => item.id === category);
  const filtered = useMemo(() => {
    const byFilter = products.filter((item) => (!category || item.category === category) && `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(term));
    if (sort === 'low') return [...byFilter].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...byFilter].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...byFilter].sort((a, b) => b.rating - a.rating);
    return byFilter;
  }, [category, sort, term]);
  const title = term ? `Search results for “${term}”` : categoryData ? categoryData.label : 'The full edit';

  return <div className="catalog-page">
    <header className="catalog-hero"><div className="container"><p className="eyebrow">{categoryData?.eyebrow || 'Everything worth discovering'}</p><h1>{title}</h1><p>{term ? 'Here are the considered finds we think you’ll love.' : categoryData ? `Pieces selected for the way you want to live, give, and gather.` : 'A considered collection of clothing, gifts and home finds with real stories behind them.'}</p></div></header>
    <div className="container catalog-content">
      <div className="catalog-toolbar"><p><b>{filtered.length}</b> lovely finds</p><div className="filter-pills">{[{ id: 'all', label: 'All' }, ...categories].map((item) => <Link key={item.id} className={(!category && item.id === 'all') || category === item.id ? 'active' : ''} to={item.id === 'all' ? '/shop' : `/category/${item.id}`}>{item.label}</Link>)}</div><label className="sort-select">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
      {filtered.length ? <div className="product-grid catalog-grid">{filtered.map((product) => <Product key={product.id} product={product} onAdd={addToCart} onToggleWishlist={toggleWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} />)}</div> : <div className="empty-state"><div>⌕</div><h2>No treasures found</h2><p>Try a different word or explore our complete collection.</p><Link className="button button-dark" to="/shop">View the full edit</Link></div>}
    </div>
  </div>;
}
