import { useState, useEffect } from "react";
import ProductModal from "./ProductModal";

export default function ProductList({ products, addToCart, admin }) {
  const [selected, setSelected] = useState(null);

  // allows similar-product cards inside modal to open another product
  useEffect(() => {
    const handler = (e) => setSelected(e.detail);
    document.addEventListener("open-product", handler);
    return () => document.removeEventListener("open-product", handler);
  }, []);

  return (
    <>
      <div className="product-grid">
        {products.map((p) => (
          <div
            key={p.id}
            className="product-card"
            onClick={() => setSelected(p)}
            style={{ cursor: "pointer" }}
          >
            <div className="image-wrapper">
              <img src={p.image} alt={p.name} />
              <span className="more-badge">+1 More</span>
            </div>
            <h3 className="product-title">{p.name}</h3>
            <div className="price-section">
              <span className="price">₹{p.price}</span>
              <span className="old-price">₹{Math.round(p.price * 1.2)}</span>
              <span className="discount">20% off</span>
            </div>
            <div className="rating-section">
              <span className="rating">3.8 ★</span>
              <span className="reviews">No Reviews</span>
            </div>
            {!admin && (
              <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <ProductModal
          product={selected}
          products={products}
          onClose={() => setSelected(null)}
          addToCart={addToCart}
          admin={admin}
        />
      )}
    </>
  );
}