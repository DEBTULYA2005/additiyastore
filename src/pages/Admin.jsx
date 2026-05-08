import { useState, useEffect } from "react";

const BASE_URL = "https://additiyastore-backend.onrender.com/api/store";

export default function Admin({ products, setProducts, admin }) {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [extraFiles, setExtraFiles] = useState([]);       // up to 3 extra images
  const [extraPreviews, setExtraPreviews] = useState([]); // preview URLs
  const [currentProduct, setCurrentProduct] = useState(null);

  const emptyForm = {
    name: "", price: "", category: "",
    material: "", length: "", neck: "",
    size_options: "", colour_options: "", description: "",
  };
  const [form, setForm] = useState(emptyForm);

  const categories = [
    "Sharee", "Kurti", "Dupatta Sets", "Skirt Top",
    "Plazzo Top", "Cord Set", "Biyer Kulo", "Biyer Mukut", "Gachkouto",
  ];

  // ── Load users ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${BASE_URL}/users/`, { headers: { Authorization: `Token ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setUsers(d); })
      .catch(console.error);
  }, []);

  // ── Helpers ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // max 3 extras
    setExtraFiles(files);
    setExtraPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const buildFormData = () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    if (imageFile) fd.append("image", imageFile);
    extraFiles.forEach((f) => fd.append("extra_images", f)); // backend expects this key
    return fd;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null); setImagePreview("");
    setExtraFiles([]); setExtraPreviews([]);
    setCurrentProduct(null);
  };

  // ── Add ──
  const handleAdd = async () => {
    if (!form.name || !form.price || !form.category) return alert("Name, price, category required.");
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/products/manage/`, {
      method: "POST",
      headers: { Authorization: `Token ${token}` },
      body: buildFormData(),
    });
    const data = await res.json();
    if (res.ok) { setProducts((prev) => [...prev, data]); setShowAdd(false); resetForm(); }
    else alert("Failed to add: " + JSON.stringify(data));
  };

  // ── Open edit ──
  const openEdit = (product) => {
    setCurrentProduct(product);
    setForm({
      name: product.name || "", price: product.price || "", category: product.category || "",
      material: product.material || "", length: product.length || "", neck: product.neck || "",
      size_options: product.size_options || "", colour_options: product.colour_options || "",
      description: product.description || "",
    });
    setImagePreview(product.image || "");
    setImageFile(null); setExtraFiles([]); setExtraPreviews([]);
    setShowEdit(true);
  };

  // ── Update ──
  const handleUpdate = async () => {
    if (!currentProduct) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/products/manage/${currentProduct.id}/`, {
      method: "PUT",
      headers: { Authorization: `Token ${token}` },
      body: buildFormData(),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts((prev) => prev.map((p) => p.id === currentProduct.id ? data : p));
      setShowEdit(false); resetForm();
    } else alert("Failed to update: " + JSON.stringify(data));
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/products/manage/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
    else alert("Failed to delete product");
  };

  if (!products) return <div>Loading...</div>;

  // ── Shared form fields JSX ──
  const FormFields = () => (
    <>
      <input name="name"           placeholder="Product name *"              value={form.name}           onChange={handleChange} />
      <input name="price"          placeholder="Price *"        type="number" value={form.price}          onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category *</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input name="material"       placeholder="Material (e.g. Heavy Malai Silk)"  value={form.material}       onChange={handleChange} />
      <input name="length"         placeholder="Length (e.g. Long length)"          value={form.length}         onChange={handleChange} />
      <input name="neck"           placeholder="Neck (e.g. V neck rise collar)"     value={form.neck}           onChange={handleChange} />
      <input name="size_options"   placeholder="Size options (e.g. S, M, L, XL)"   value={form.size_options}   onChange={handleChange} />
      <input name="colour_options" placeholder="Colour options (e.g. Red, Blue)"   value={form.colour_options} onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Description..."
        value={form.description}
        onChange={handleChange}
        rows={3}
        style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #e0e0e0", fontSize: "15px", fontFamily: "inherit", resize: "vertical", width: "100%" }}
      />

      {/* Main image */}
      <label style={{ fontSize: "13px", color: "#888", marginBottom: "-6px" }}>Main Image</label>
      <input type="file" accept="image/*" onChange={handleMainImage} />
      {imagePreview && (
        <img src={imagePreview} alt="main-preview"
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
      )}

      {/* Extra images */}
      <label style={{ fontSize: "13px", color: "#888", marginBottom: "-6px" }}>
        Extra Images (up to 3)
      </label>
      <input type="file" accept="image/*" multiple onChange={handleExtraImages} />
      {extraPreviews.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {extraPreviews.map((src, i) => (
            <img key={i} src={src} alt={`extra-${i}`}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "2px solid #2e7d32" }} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="admin-page">
      <h2>Welcome! Admin {admin?.username || ""}</h2>

      {/* Users table */}
      <div className="table-section">
        <h3>All Users</h3>
        <table>
          <thead><tr><th>Name</th><th>Email</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}><td>{u.username}</td><td>{u.email}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products table */}
      <div className="table-section">
        <div className="admin-topbar">
          <h3>Products</h3>
          <button className="add-btn" onClick={() => { resetForm(); setShowAdd(true); }}>+ Add Product</button>
        </div>
        <table>
          <thead>
            <tr><th>Image</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => openEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} style={{ background: "#e53935" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h3>Add Product</h3>
            <FormFields />
            <div className="modal-actions">
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => { setShowAdd(false); resetForm(); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h3>Update Product</h3>
            <FormFields />
            <div className="modal-actions">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => { setShowEdit(false); resetForm(); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}