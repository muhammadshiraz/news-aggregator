import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/preferences'>Preferences</Link>
    </nav>
  );
};

export default Navbar;
