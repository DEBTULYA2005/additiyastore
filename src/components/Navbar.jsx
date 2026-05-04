import logo from "../assets/logo.png";
import { logoutUser } from "../api";

export default function Navbar({
  setFilter,
  setPage,
  user,
  setUser,
  setShowAuth,
  setShowAdminLogin,
}) {

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setPage("home");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => setPage("home")}>
        <img src={logo} alt="logo" className="logo-img" />
        <span>AdditiyaStore</span>
      </div>

      <div className="nav-links">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("Sharee")}>Sharee</button>
        <button onClick={() => setFilter("Kurti")}>Kurti</button>
        <button onClick={() => setFilter("Dupatta Sets")}>Dupatta Sets</button>
        <button onClick={() => setFilter("Sleepwear")}>Sleepwear</button>
        <button onClick={() => setFilter("Lehengas")}>Lehengas</button>
        <button onClick={() => setFilter("Blouses")}>Blouses</button>
      </div>

      <div className="nav-right">

        {/* ADMIN */}
        <button
          className="admin-btn"
          onClick={() => setShowAdminLogin(true)}
        >
          <b>ADMIN</b>
        </button>

        {user ? (
          <>
            <button className="action-btn" onClick={() => setPage("account")}>
              Account
            </button>
            <span>Hi, {user.username}</span>
            <button className="action-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="action-btn" onClick={() => setPage("account")}>
              Account
            </button>
            <button className="action-btn" onClick={() => setShowAuth(true)}>
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}