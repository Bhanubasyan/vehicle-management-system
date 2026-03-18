import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";

function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://vehicle-management-system-5d2c.onrender.com//api//auth//login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
  console.log(err.response?.data); // 🔥 important
  alert(err.response?.data?.msg || "Login failed");
}
  };

  // 📝 SIGNUP
  const handleSignup = async () => {
    try {
      await axios.post(
        "https://vehicle-management-system-5d2c.onrender.com//api//auth//signup",
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }
      );

      alert("Signup successful");
      setIsFlipped(false); // login pe wapas
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className={`card ${isFlipped ? "flipped" : ""}`}>

        {/* LOGIN */}
        <div className="front">
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p onClick={() => setIsFlipped(true)}>
            Don't have an account? Signup
          </p>
        </div>

        {/* SIGNUP */}
        <div className="back">
          <h2>Signup</h2>

          <input
            placeholder="Name"
            onChange={(e) => setSignupName(e.target.value)}
          />

          <input
            placeholder="Email"
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          <button onClick={handleSignup}>Signup</button>

          <p onClick={() => setIsFlipped(false)}>
            Already have an account? Login
          </p>
        </div>

      </div>
    </div>
  );
}

export default Auth;