import React from 'react'
import NavItem from '../header-comps/NavItem';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer-container'>
      <footer className="footer">
        <ul className="footer__navlist">
            <NavItem to="/about" text="about"/>
            <NavItem to="/contact" text="contact"/>
            <NavItem to="/policy" text="policy"/>
        </ul>
        <p className='footer__copyright'>All right reseverd &copy; CodingSarkar</p>
      </footer>
    </div>
  )
}

export default Footer
