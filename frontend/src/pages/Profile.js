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

const BASE_URL = process.env.REACT_APP_API_URL;

//  Fetch vehicles
useEffect(() => {
fetchVehicles();
}, []);

const fetchVehicles = () => {
fetch(`${BASE_URL}/api/vehicles`)
.then(res => {
if (!res.ok) throw new Error("Failed to fetch");
return res.json();
})
.then(data => setVehicles(data))
.catch(err => console.log(err));
};

//  STATS
const total = vehicles.length;
const aging = vehicles.filter(v => v.status === "Aging").length;
const sold = vehicles.filter(v => v.status === "Sold").length;
const inStock = vehicles.filter(v => v.status === "In Stock").length;

//  ADD / UPDATE
const handleSubmit = async () => {
try {
if (editId) {
await fetch(`${BASE_URL}/api/vehicles/${editId}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});
} else {
await fetch(`${BASE_URL}/api/vehicles`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});
}


  setShowForm(false);
  setFormData({ make: "", model: "", year: "", status: "In Stock" });
  setEditId(null);
  fetchVehicles();

} catch (err) {
  console.log(err);
}


};

//  DELETE
const handleDelete = async (id) => {
try {
await fetch(`${BASE_URL}/api/vehicles/${id}`, {
method: "DELETE",
});
fetchVehicles();
} catch (err) {
console.log(err);
}
};

//  EDIT
const handleEdit = (v) => {
setFormData(v);
setEditId(v._id);
setShowForm(true);
};

return ( <div className="profile">


  <div className="profile-left">

    <div className="profile-card">
      <h2>👤 Admin Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>

    <div className="profile-card">
      <h3>Total Vehicles</h3>
      <h1>{total}</h1>

      <div className="vehicle-stats">
        <p className="green">In Stock: {inStock}</p>
        <p className="red">Aging: {aging}</p>
        <p className="blue">Sold: {sold}</p>
      </div>
    </div>

    <button onClick={() => {
      setShowForm(true);
      setEditId(null);
    }}>
      + Add Vehicle
    </button>

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
