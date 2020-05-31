import React from 'react';
import {
    Nav,
    NavbarBrand,
  } from 'reactstrap';
  import pokeball from './img/pokeball.png'; 
  import './header.css';

function Header() {

    return (
        <div className="menu">
            <Nav sticky="top" className="navbar navbar-expand-lg ">
            <NavbarBrand href="/"><img className="pokeball" src={pokeball} alt="Logo" /></NavbarBrand>
            </Nav>

        </div>
    );
  }
  
  export default Header;
  /*  
 */