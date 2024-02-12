import React from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/buttons/Button";
import { Link } from "react-router-dom";

function About() {
  return (
    <Layout title="about use - eccomerce app">
      <div className="page-not-found-container">
        <div className="page-not-found">
          <h2>this is about us</h2>
          <h1>about</h1>
          <Link to="/">
            <Button text="Go to homepage" className="primary-btn" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default About;
