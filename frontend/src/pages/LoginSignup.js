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

const BASE_URL = process.env.REACT_APP_API_URL;

// LOGIN
const handleLogin = async () => {
try {
const res = await axios.post(
`${BASE_URL}/api/auth/login`,
{
email: loginEmail,
password: loginPassword,
}
);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  navigate("/dashboard");

} catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.msg || "Login failed");
}

};

// SIGNUP
const handleSignup = async () => {
try {
await axios.post(
`${BASE_URL}/api/auth/signup`,
{
name: signupName,
email: signupEmail,
password: signupPassword,
}
);

  alert("Signup successful");
  setIsFlipped(false);

} catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.msg || "Signup failed");
}

};

return ( <div className="auth-container">
<div className={`card ${isFlipped ? "flipped" : ""}`}>

```
    <div className="front">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p onClick={() => setIsFlipped(true)}>
        Don't have an account? Signup
      </p>
    </div>

    <div className="back">
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={signupName}
        onChange={(e) => setSignupName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={signupPassword}
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
