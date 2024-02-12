import React from "react";
import "./Button.css"

function Button({ text, className , type}) {
  return <button className={`button ${className}`} type={type}>{text}</button>;
}
export default Button;
