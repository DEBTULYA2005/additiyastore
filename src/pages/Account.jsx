import { useEffect, useState } from "react";
import { getCart, removeFromCart, getOrders, checkout } from "../api";

export default function Account({ user }) {
  const [cartData, setCartData] = useState(null);
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState("cart");

  useEffect(() => {
    if (!user) return;
    Promise.all([getCart(), getOrders()])
      .then(([cartRes, ordersRes]) => {
        setCartData(cartRes);
        setOrders(ordersRes);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
    setCartData(await getCart());
  };

  const handleCheckout = async () => {
    await checkout();
    const [updatedCart, updatedOrders] = await Promise.all([getCart(), getOrders()]);
    setCartData(updatedCart);
    setOrders(updatedOrders);
    alert("Order placed successfully!");
  };

  if (!user)   return <h2 className="center">Please login</h2>;
  if (loading) return <h2 className="center">Loading...</h2>;

  return (
    <div className="acc-page">
      <div className="acc-container">

        {/* PROFILE */}
        <div className="acc-profile">
          <div className="acc-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="acc-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="acc-tabs">
          <button
            className={`acc-tab ${tab === "cart" ? "active" : ""}`}
            onClick={() => setTab("cart")}
          >
            🛒 Cart ({cartData?.items?.length || 0})
          </button>
          <button
            className={`acc-tab ${tab === "orders" ? "active" : ""}`}
            onClick={() => setTab("orders")}
          >
            📦 Orders ({orders.length})
          </button>
        </div>

        {/* CART TAB */}
        {tab === "cart" && (
          <div className="acc-card">
            <h3>Your Cart</h3>
            {cartData?.items?.length === 0 ? (
              <p className="empty-msg">Your cart is empty 🛍️</p>
            ) : (
              <>
                {cartData?.items?.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <span className="cart-item-name">{item.product.name}</span>
                    <div className="cart-item-meta">
                      <span>Qty: {item.quantity}</span>
                      <span className="cart-item-price">₹{item.subtotal}</span>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-price">₹{cartData?.total}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Place Order →
                </button>
              </>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div className="acc-card">
            <h3>Your Orders</h3>
            {orders.length === 0 ? (
              <p className="empty-msg">No orders yet 📦</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item-line">
                      {item.product.name} × {item.quantity} — ₹{item.subtotal}
                    </div>
                  ))}
                  <div className="order-total">Total: ₹{order.total_price}</div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}