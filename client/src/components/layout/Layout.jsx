import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, author, description, keywords }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="main-container">
        <ToastContainer/>
        {children}</main>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Ecccomerce App - Shop Now",
  description: "mern stack ecoomerce app",
  author: "CodingSarkar",
  keywords: "mern stack, react, node, express, mongoDB, javascript, html, css",
};

export default Layout;
