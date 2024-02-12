import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";

function PageNotFound() {
  return (
    <Layout title="go back - page not found">
      <div className="page-not-found-container">
        <div className="page-not-found">
          <h2>Oops! Page Not Found</h2>
          <h1>404</h1>
          <Link to="/">
            <Button text="Go to homepage" className="primary-btn" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PageNotFound;
