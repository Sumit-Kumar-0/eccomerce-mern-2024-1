import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import FormContainer from "./FormContainer";
import InputField from "./InputField";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: localStorage.getItem("token"),
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
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        formData
      );
      if (res.data.success) {
        toast.success(`hello ${formData.name} you are login successfully!!`);
        let token = localStorage.getItem("token");
        console.log(token);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };
  return (
    <Layout title="login your account - eccomerce app">
      <div className="login-container">
        <FormContainer heading="login your account" onSubmit={submitHandler}>
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
          <Button type="submit" text="login" className="primary-btn" />
        </FormContainer>
      </div>
    </Layout>
  );
}

export default Login;
