import React from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/buttons/Button";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <Layout title="contact us - eccomerce app">
      <div className="page-not-found-container">
        <div className="page-not-found">
          <h2>this is contact us</h2>
          <h1>contact</h1>
          <Link to="/">
            <Button text="Go to homepage" className="primary-btn" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
