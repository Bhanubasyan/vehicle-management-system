import { useEffect, useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    status: "In Stock"
  });
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    fetch("http://localhost:5000/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data));
  };

  // ✅ STATS
  const total = vehicles.length;
  const aging = vehicles.filter(v => v.status === "Aging").length;
  const sold = vehicles.filter(v => v.status === "Sold").length;
  const inStock = vehicles.filter(v => v.status === "In Stock").length;

  // ✅ ADD / UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await fetch(`http://localhost:5000/vehicles/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch("http://localhost:5000/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    }

    setShowForm(false);
    setFormData({ make: "", model: "", year: "", status: "In Stock" });
    setEditId(null);
    fetchVehicles(); 
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/vehicles/${id}`, {
      method: "DELETE"
    });
    fetchVehicles();
  };

  // ✅ EDIT
  const handleEdit = (v) => {
    setFormData(v);
    setEditId(v._id);
    setShowForm(true);
  };

  return (
    <div className="profile">

      {/* LEFT SIDE */}
      <div className="profile-left">

        {/* 👤 USER */}
        <div className="profile-card">
          <h2>👤 Admin Profile</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* 📊 TOTAL */}
        <div className="profile-card">
          <h3>Total Vehicles</h3>
          <h1>{total}</h1>

          <div className="vehicle-stats">
            <p className="green">In Stock: {inStock}</p>
            <p className="red">Aging: {aging}</p>
            <p className="blue">Sold: {sold}</p>
          </div>
        </div>

        {/* ➕ ADD BUTTON */}
        <button onClick={() => {
          setShowForm(true);
          setEditId(null);
        }}>
          + Add Vehicle
        </button>

        {/* 📝 FORM */}
        {showForm && (
          <div className="form-box">

            <input
              placeholder="Make"
              value={formData.make}
              onChange={(e) => setFormData({...formData, make: e.target.value})}
            />

            <input
              placeholder="Model"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
            />

            <input
              placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />

            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>In Stock</option>
              <option>Sold</option>
              <option>Aging</option>
            </select>

            <button onClick={handleSubmit}>
              {editId ? "Update" : "Add"}
            </button>

          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">

        <div className="profile-card">
          <h3>Your Vehicles</h3>

          <div className="profile-vehicles">
            {vehicles.map((v) => (
              <div key={v._id} className="profile-vehicle">

                <p>{v.make} {v.model}</p>

                <span>{v.status}</span>

                <div className="actions">
                  <button onClick={() => handleEdit(v)}>Edit</button>
                  <button onClick={() => handleDelete(v._id)}>Delete</button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;