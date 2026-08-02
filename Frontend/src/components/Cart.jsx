function Cart({ cart }) {
  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">Cart is Empty</div>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <h2>₹{item.price}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;