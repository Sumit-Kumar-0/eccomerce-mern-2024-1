import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import InputField from "./InputField";
import Button from "../../components/buttons/Button";
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success(`hello ${formData.name} your registration successful!!`)
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
  };
  return (
    <Layout title="register your account - eccomerce app">
      <div className="register-container">
        <form className="register" onSubmit={submitHandler}>
          <h2>Register your account</h2>
          <InputField
            type="text"
            placeholder="type your name"
            name="name"
            required="required"
            value={formData.name}
            onChange={changeHandler}
          />
          <InputField
            type="email"
            placeholder="type your email"
            name="email"
            required="required"
            value={formData.email}
            onChange={changeHandler}
          />
          <InputField
            type="password"
            placeholder="type your password"
            name="password"
            required="required"
            value={formData.password}
            onChange={changeHandler}
          />
          <InputField
            type="text"
            placeholder="type your number"
            name="phone"
            required="required"
            value={formData.phone}
            onChange={changeHandler}
          />
          <InputField
            type="text"
            placeholder="type your address"
            name="address"
            required="required"
            value={formData.address}
            onChange={changeHandler}
          />
          <Button type="submit" text="send" className="primary-btn" />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
