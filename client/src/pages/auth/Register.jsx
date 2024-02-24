import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import InputField from "./InputField";
import Button from "../../components/buttons/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        formData,
        {
          "Content-Type": "application/json",
        }
      );
      if (res && res.data.success) {
        toast.success(`hello ${formData.name} your registration successful!!`);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });
        // navigate("/login");
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong 123");
    }
  };
  return (
    <Layout title="register your account - eccomerce app">
      <div className="register-container">
        <FormContainer heading="Register your account" onSubmit={submitHandler}>
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
          <Button type="submit" text="register" className="primary-btn" />
        </FormContainer>
      </div>
    </Layout>
  );
}

export default Register;
