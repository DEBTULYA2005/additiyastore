export default function ProductModal({ product, products, onClose, addToCart, admin }) {
  const similar = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="modal-fullscreen" onClick={onClose}>
      <div className="modal-fullscreen-inner" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <button className="modal-back-btn" onClick={onClose}>←</button>
          <span className="modal-header-title">Product Details</span>
        </div>

        {/* Image */}
        <div className="modal-image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Info */}
        <div className="modal-info">
          <h2>{product.name}</h2>

          <div className="modal-price-row">
            <span className="modal-price">₹{product.price}</span>
            <span className="modal-old-price">₹{Math.round(product.price * 1.2)}</span>
            <span className="modal-discount">20% off</span>
          </div>

          <div className="modal-rating-row">
            <span className="rating">3.8 ★</span>
            <span className="reviews">No Reviews</span>
          </div>

          {product.category && (
            <span className="modal-category-badge">{product.category}</span>
          )}

          {product.description && (
            <p className="modal-description">{product.description}</p>
          )}

          {!admin && (
            <button className="modal-add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          )}
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <div className="modal-similar">
            <h3>Similar Products</h3>
            <div className="product-grid">
              {similar.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => {
                    onClose();
                    setTimeout(() => document.dispatchEvent(new CustomEvent("open-product", { detail: p })), 10);
                  }}
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
          </div>
        )}

      </div>
    </div>
  );
}