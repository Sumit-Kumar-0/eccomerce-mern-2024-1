import React from "react";

function FormContainer({ children, heading, onSubmit }) {
  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>{heading}</h2>
      {children}
    </form>
  );
}

export default FormContainer;
