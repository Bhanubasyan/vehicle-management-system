import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const text = "INVENTORY DASHBOARD".split("");
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  // show buttons after animation
  useEffect(() => {
    setTimeout(() => {
      setShowButtons(true);
    }, 2500);
  }, []);

  // particle transition
  const handleTransition = () => {
    const overlay = document.querySelector(".particle-overlay");
    overlay.classList.add("active");

    setTimeout(() => {
      navigate("/auth");
    }, 800);
  };

  return (
    <div className="landing-container">

      {/* animated text */}
      <div className="text-container">
        {text.map((char, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* buttons */}
      {showButtons && (
        <div className="buttons">
          <button onClick={handleTransition}>Login</button>
          <button onClick={handleTransition}>Signup</button>
        </div>
      )}

      {/* particle overlay */}
      <div className="particle-overlay"></div>

    </div>
  );
}

export default Landing;