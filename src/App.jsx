import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import AdminLoginModal from "./components/AdminLoginModal";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

import { getProducts, addToCart as addToCartAPI } from "./api";

export default function App() {
  const [user, setUser]               = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [admin, setAdmin]             = useState(JSON.parse(localStorage.getItem("admin")) || null);
  const [showAuth, setShowAuth]       = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [page, setPage] = useState(() => {
  const savedPage = localStorage.getItem("page");
  const savedAdmin = localStorage.getItem("admin");
  // only restore admin page if admin data exists
  if (savedPage === "admin" && !savedAdmin) return "home";
  return savedPage || "home";
});
  const [products, setProducts]       = useState([]);
  const [cart, setCart]               = useState(null);
  const [filter, setFilter]           = useState("all");

  // ── Fetch products from Django ──
  useEffect(() => {
    getProducts(filter).then(setProducts);
  }, [filter]);

  // ── Restore admin page on refresh ──
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // ── User Login ──
  const handleAuth = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setShowAuth(false);
  };

  // ── Admin Login ──
  const handleAdminLogin = (adminData, token) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("token", token);
    setShowAdminLogin(false);
    setPage("admin");
  };

  // ── User Logout ──
  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("page");
    setPage("home");
  };

  // ── Add to Cart ──
  const handleAddToCart = async (product) => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    const updatedCart = await addToCartAPI(product.id);
    setCart(updatedCart);

    setPage("account");
  };

  return (
    <div>
      <Navbar
        setFilter={setFilter}
        setPage={setPage}
        user={user}
        setUser={setUser}
        cart={cart}
        setShowAuth={setShowAuth}
        setShowAdminLogin={setShowAdminLogin}
        onLogout={handleLogout}
      />

      {showAuth && (
        <AuthModal
          onAuth={handleAuth}
          onClose={() => setShowAuth(false)}
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={handleAdminLogin}
        />
      )}

      {page === "home" && (
        <Home products={products} addToCart={handleAddToCart} admin={admin}/>
      )}

      {page === "account" && (
        <Account user={user} cart={cart} />
      )}

      {page === "admin" && admin && (
        <Admin
          products={products}
          setProducts={setProducts}
          admin={admin}
        />
      )}

      <Footer />
    </div>
  );
}