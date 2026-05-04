export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h4>Shop</h4>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>Accessories</p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <p>Help Center</p>
          <p>Returns</p>
          <p>Shipping</p>
          <p>Track Order</p>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: support@additiya.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} AdditiyaStore. All rights reserved.
      </div>

    </footer>
  );
}