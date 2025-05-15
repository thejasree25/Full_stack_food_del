import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <img className='logo' src={assets.logo} alt='Logo' />
        <img className='profile' src={assets.profile_image} alt='Profile' />
      </div>
      <div className='hamburger' onClick={toggleSidebar}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;