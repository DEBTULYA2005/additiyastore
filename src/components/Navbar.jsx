import { useState } from "react";
import logo from "../assets/logo.png";
import { logoutUser } from "../api";

export default function Navbar({
  setFilter,
  setPage,
  user,
  setUser,
  setShowAuth,
  setShowAdminLogin,
  onLogout,
  admin,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await onLogout();
    setMenuOpen(false);
  };

  const handleFilter = (f) => {
    setFilter(f);
    setPage("home");
    setMenuOpen(false);
  };

  const categories = ["All", "Sharee", "Kurti", "Dupatta Sets", "Sleepwear", "Lehengas", "Blouses"];

  return (
    <>
      <div className="navbar">
        {/* LEFT — Logo */}
        <div className="logo" onClick={() => { setPage("home"); setMenuOpen(false); }}>
          <img src={logo} alt="logo" className="logo-img" />
          <span>AdditiyaStore</span>
        </div>

        {/* CENTER — category links (desktop only) */}
        <div className="nav-links">
          {categories.map((cat) => (
            <button key={cat} onClick={() => handleFilter(cat === "All" ? "all" : cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* RIGHT — desktop buttons + hamburger */}
        <div className="nav-right">
          <div className="nav-desktop-actions">

            {/* Show badge if admin logged in, otherwise show ADMIN button */}
            {admin ? (
              <span className="admin-badge">
                👑 {admin.username}
              </span>
            ) : (
              <button className="admin-btn" onClick={() => setShowAdminLogin(true)}>
                ADMIN
              </button>
            )}

            {user ? (
              <>
                <button className="action-btn" onClick={() => setPage("account")}>Account</button>
                <button className="action-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="action-btn" onClick={() => setPage("account")}>Account</button>
                <button className="action-btn" onClick={() => setShowAuth(true)}>Login</button>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="mobile-drawer">

          {/* Admin banner at top of drawer */}
          {admin && (
            <div className="drawer-admin-banner">
              👑 Admin: <strong>{admin.username}</strong>
            </div>
          )}

          {/* Categories */}
          <div className="drawer-section">
            <p className="drawer-label">Categories</p>
            {categories.map((cat) => (
              <button key={cat} className="drawer-item" onClick={() => handleFilter(cat === "All" ? "all" : cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="drawer-divider" />

          {/* Account actions */}
          <div className="drawer-section">
            {!admin && (
              <button className="drawer-item" onClick={() => { setShowAdminLogin(true); setMenuOpen(false); }}>
                🔐 Admin Login
              </button>
            )}
            {admin && (
              <button className="drawer-item" onClick={() => { setPage("admin"); setMenuOpen(false); }}>
                ⚙️ Admin Panel
              </button>
            )}
            <button className="drawer-item" onClick={() => { setPage("account"); setMenuOpen(false); }}>
              👤 Account
            </button>
            {user ? (
              <button className="drawer-item drawer-logout" onClick={handleLogout}>
                🚪 Logout ({user.username})
              </button>
            ) : admin ? (
              <button className="drawer-item drawer-logout" onClick={handleLogout}>
                🚪 Admin Logout
              </button>
            ) : (
              <button className="drawer-item drawer-login" onClick={() => { setShowAuth(true); setMenuOpen(false); }}>
                🔑 Login / Signup
              </button>
            )}
          </div>
        </div>
      )}

      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}