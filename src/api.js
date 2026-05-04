const BASE_URL = "http://localhost:8000/api/store";

// helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// helper for headers
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${getToken()}`,
});

// ──────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────

export const registerUser = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),  // 👈 Django expects username
  });
  return res.json();
};

export const adminLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/admin-login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),  // ✅ MUST be email
  });
  return res.json();
};

// ──────────────────────────────────────────
// AUTH - LOGOUT
// ──────────────────────────────────────────

export const logoutUser = async () => {
  await fetch(`${BASE_URL}/logout/`, {
    method: "POST",
    headers: authHeaders(),
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ──────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────

export const getProducts = async (category = "all") => {
  const url =
    category === "all"
      ? `${BASE_URL}/products/`
      : `${BASE_URL}/products/?category=${category}`;
  const res = await fetch(url);
  return res.json();
};

// Admin only
export const createProduct = async (productData) => {
  const res = await fetch(`${BASE_URL}/products/manage/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${BASE_URL}/products/manage/${id}/`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/manage/${id}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.ok;
};

// ──────────────────────────────────────────
// CART
// ──────────────────────────────────────────

export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart/`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const addToCart = async (product_id, quantity = 1) => {
  const res = await fetch(`${BASE_URL}/cart/items/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ product_id, quantity }),
  });
  return res.json();
};

export const removeFromCart = async (itemId) => {
  const res = await fetch(`${BASE_URL}/cart/items/${itemId}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.ok;
};

// ──────────────────────────────────────────
// ORDERS
// ──────────────────────────────────────────

export const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const checkout = async () => {
  const res = await fetch(`${BASE_URL}/orders/`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
};