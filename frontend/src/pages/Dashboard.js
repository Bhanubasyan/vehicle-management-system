import { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaSearch,
  FaFilter,
  FaChartBar,
  FaUser,
  FaUserCircle
} from "react-icons/fa";

import Alert from "../components/Alert";
import ChartBox from "../components/Charts";
import Navbar from "../components/Navbar";

import "../styles/Dashboard.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [makeFilter, setMakeFilter] = useState("");
  const [agingFilter, setAgingFilter] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
const [showSearch, setShowSearch] = useState(false);
const [showFilter, setShowFilter] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  let user = null;

const storedUser = localStorage.getItem("user");

if (storedUser && storedUser !== "undefined") {
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    user = null;
  }
}

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  const goToAuth = () => {
    window.location.href = "/auth";
  };

  const filteredVehicles = vehicles.filter((v) => {
    return (
      (makeFilter === "" || v.make === makeFilter) &&
      (
        v.make.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  let finalVehicles = [...filteredVehicles];

  if (sort === "new") {
    finalVehicles.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate));
  } else if (sort === "old") {
    finalVehicles.sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
  }

  return (
    <div className={darkMode ? "layout dark" : "layout"}>

      {/*  SIDEBAR */}
      
      <div className="sidebar">
        <FaUserCircle
  className="icon"
  onClick={() => window.location.href = "/profile"}
/>
<div className="sidebar-bottom">
  {user ? (
    <FaSignOutAlt className="icon logout" onClick={handleLogout} />
  ) : (
    <FaUser className="icon" onClick={goToAuth} />
  )}

  
</div>
        
        {/* 🔍 SEARCH */}
<div className="sidebar-section">
  <FaSearch
    className="icon"
    onClick={() => setShowSearch(!showSearch)}
  />

  {showSearch && (
    <input
      placeholder="Search..."
      onChange={(e) => setSearch(e.target.value)}
    />
  )}
</div>

{/* 🎯 FILTER */}
<div className="sidebar-section">
  <FaFilter
    className="icon"
    onClick={() => setShowFilter(!showFilter)}
  />

  {showFilter && (
    <>
      <select onChange={(e) => setMakeFilter(e.target.value)}>
        <option value="">All Makes</option>
        {[...new Set(vehicles.map(v => v.make))].map((make) => (
          <option key={make}>{make}</option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setAgingFilter(e.target.checked)}
        />
        Aging
      </label>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
      </select>
    </>
  )}
</div>

        {/* 📊 GRAPH ICON */}
        <FaChartBar className="icon" />

        {/* 🌙 DARK MODE */}
        {darkMode ? (
          <FaSun className="icon" onClick={() => setDarkMode(false)} />
        ) : (
          <FaMoon className="icon" onClick={() => setDarkMode(true)} />
        )}

       
      </div>

      {/* MAIN */}
      <div className="main">

        <Navbar />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <ChartBox vehicles={finalVehicles} />

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Arrival Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {finalVehicles.map((v) => (
                <tr key={v._id}>
                  <td>{v.make}</td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.arrivalDate}</td>
                  <td>
                    <span className={
                      v.status === "Aging" ? "tag-red" :
                      v.status === "In Stock" ? "tag-green" :
                      v.status === "Sold" ? "tag-blue" : "tag-yellow"
                    }>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;