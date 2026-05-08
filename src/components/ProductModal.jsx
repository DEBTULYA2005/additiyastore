import { useState } from "react";

export default function ProductModal({ product, products, onClose, addToCart, admin }) {
  const similar = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // Build image list: main image + extra images from product.images array
  const extraImages = Array.isArray(product.images) ? product.images.map((img) => img.image) : [];
  const allImages = product.image
    ? [product.image, ...extraImages]
    : extraImages.length > 0
    ? extraImages
    : [];

  const [currentImg, setCurrentImg] = useState(0);

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="modal-fullscreen" onClick={onClose}>
      <div className="modal-fullscreen-inner" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <button className="modal-back-btn" onClick={onClose}>←</button>
          <span className="modal-header-title">Product Details</span>
        </div>

        {/* Image Slider */}
        <div className="modal-image-wrapper" style={{ position: "relative" }}>
          {allImages.length > 0 ? (
            <img src={allImages[currentImg]} alt={product.name} />
          ) : (
            <div style={{ color: "#aaa", fontSize: "14px" }}>No Image</div>
          )}

          {/* Prev / Next buttons — only show if more than 1 image */}
          {allImages.length > 1 && (
            <>
              <button className="slider-btn slider-btn-left" onClick={goPrev}>‹</button>
              <button className="slider-btn slider-btn-right" onClick={goNext}>›</button>

              {/* Dot indicators */}
              <div className="slider-dots">
                {allImages.map((_, i) => (
                  <span
                    key={i}
                    className={`slider-dot ${i === currentImg ? "active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                  />
                ))}
              </div>

              {/* Image counter */}
              <span className="slider-counter">{currentImg + 1} / {allImages.length}</span>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="slider-thumbs">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`slider-thumb ${i === currentImg ? "active" : ""}`}
                onClick={() => setCurrentImg(i)}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="modal-info">
          <h2>{product.name}</h2>

          <div className="modal-price-row">
            <span className="modal-price">₹{product.price}</span>
            {product.old_price && (
            <span className="modal-old-price">₹{Math.round(product.old_price)}</span>
          )}
          {product.discount > 0 && (
            <span className="modal-discount">{Math.round(product.discount)}% off</span>
          )}
          </div>

          <div className="modal-rating-row">
            <span className="rating">3.8 ★</span>
            <span className="reviews">No Reviews</span>
          </div>

          {product.category && (
            <span className="modal-category-badge">{product.category}</span>
          )}

          {/* New detail fields */}
          <div className="modal-details">
            {product.material && (
              <div className="modal-detail-row">
                <span className="detail-label">Material</span>
                <span className="detail-value">{product.material}</span>
              </div>
            )}
            {product.length && (
              <div className="modal-detail-row">
                <span className="detail-label">Length</span>
                <span className="detail-value">{product.length}</span>
              </div>
            )}
            {product.neck && (
              <div className="modal-detail-row">
                <span className="detail-label">Neck</span>
                <span className="detail-value">{product.neck}</span>
              </div>
            )}
            {product.size_options && (
              <div className="modal-detail-row">
                <span className="detail-label">Size</span>
                <span className="detail-value">{product.size_options}</span>
              </div>
            )}
            {product.colour_options && (
              <div className="modal-detail-row">
                <span className="detail-label">Colour</span>
                <span className="detail-value">{product.colour_options}</span>
              </div>
            )}
          </div>

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
                    {Array.isArray(p.images) && p.images.length > 0 && (
                      <span className="more-badge">+{p.images.length} More</span>
                    )}
                  </div>
                  <h3 className="product-title">{p.name}</h3>
                  <div className="price-section">
                    <span className="price">₹{p.price}</span>
                    {p.old_price && (
                    <span className="modal-old-price">₹{Math.round(p.old_price)}</span>
                  )}
                  {p.discount > 0 && (
                    <span className="modal-discount">{Math.round(p.discount)}% off</span>
                  )}
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