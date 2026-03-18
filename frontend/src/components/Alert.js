import React from "react";
function Alert({ type, message, onClose }) {
  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>X</button>
    </div>
  );
}

export default Alert;