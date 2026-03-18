import React from "react";

const Navbar = () => {
let user = null;

try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  user = null;
}

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  return (
    <div style={styles.navbar}>
  
      <h2 style={styles.logo}>Inventory Dashboard</h2>

      <div style={styles.right}>
        <h4 style={styles.user}>
          Welcome, {user?.name || "User"} 👋
        </h4>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    borderBottom: "1px solid #334155",
  },
  logo: {
    margin: 0,
    color: "#3b82f6",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  user: {
    margin: 0,
  },
  logoutBtn: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
  },
};