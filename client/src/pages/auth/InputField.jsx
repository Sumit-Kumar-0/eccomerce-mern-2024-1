import React from "react";

function InputField({ type, placeholder, name, value, onChange, required }) {
  return (
    <div className="input-field">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default InputField;
