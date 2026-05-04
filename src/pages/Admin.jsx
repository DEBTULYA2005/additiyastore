import { useState, useEffect } from "react";

export default function Admin({ products, setProducts, admin }) {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  const categories = [
  "Sharee",
  "Kurti",
  "Dupatta Sets",
  "Skirt Top",
  "Plazzo Top",
  "Cord Set",
  "Biyer Kulo",
  "Biyer Mukut",
  "Gachkouto",
];

  // ================= LOAD USERS =================
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;  // 👈 don't fetch if no token

  fetch("https://additiyastore-backend.onrender.com/api/store/users/", {
    headers: { "Authorization": `Token ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) setUsers(data);  // 👈 only set if it's actually an array
      else console.error("Users fetch error:", data);
    })
    .catch((err) => console.error("Failed to fetch users:", err));
}, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================= HANDLE IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // ================= ADD PRODUCT =================
  const handleAdd = async () => {
    if (!form.name || !form.price || !form.category) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("https://additiyastore-backend.onrender.com/api/store/products/manage/", {
      method: "POST",
      headers: { "Authorization": `Token ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setProducts((prev) => [...prev, data]);
      setShowAdd(false);
      setForm({ name: "", price: "", category: "" });
      setImage("");
      setImageFile(null);
    } else {
      alert("Failed to add: " + JSON.stringify(data));
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (product) => {
    setCurrentProduct(product);
    setForm({ name: product.name, price: product.price, category: product.category });
    setImage(product.image);
    setImageFile(null);
    setShowEdit(true);
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    if (!currentProduct) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch(`https://additiyastore-backend.onrender.com/api/store/products/manage/${currentProduct.id}/`, {
      method: "PUT",
      headers: { "Authorization": `Token ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setProducts((prev) => prev.map((p) => p.id === currentProduct.id ? data : p));
      setShowEdit(false);
      setImage("");
      setImageFile(null);
      setCurrentProduct(null);
    } else {
      alert("Failed to update: " + JSON.stringify(data));
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://additiyastore-backend.onrender.com/api/store/products/manage/${id}/`, {
      method: "DELETE",
      headers: { "Authorization": `Token ${token}` },
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete product");
    }
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div className="admin-page">
      <h2>Wellcome! Admin {admin?.username || "hello"}</h2>

      {/* ================= USERS TABLE ================= */}
      <div className="table-section">
        <h3>All Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.username}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PRODUCTS TABLE ================= */}
      <div className="table-section">
        <div className="admin-topbar">
          <h3>Products</h3>
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            + Add Product
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                  />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => openEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD MODAL ================= */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h3>Add Product</h3>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input type="file" accept="image/*" onChange={handleImage} />
            {image && (
              <img src={image} alt="preview" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
            )}
            <div className="modal-actions">
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => { setShowAdd(false); setImage(""); setImageFile(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h3>Update Product</h3>
            <input name="name" value={form.name} onChange={handleChange} />
            <input name="price" value={form.price} onChange={handleChange} />
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input type="file" accept="image/*" onChange={handleImage} />
            {image && (
              <img src={image} alt="preview" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
            )}
            <div className="modal-actions">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => { setShowEdit(false); setImage(""); setImageFile(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}