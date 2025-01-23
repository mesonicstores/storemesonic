import React, { useState } from 'react';
import './header.css';
import { useCart } from '../context/CartContext';
import userImg from '../images/user.jpg';
import Cart from '../components/Cart';
import UserProfile from './UserProfile';

function Header({ toggleActive }) {
  const { bag } = useCart();
  const [menu, setMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
    toggleActive();
  };

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const toggleProfile = (e) => {
    e.preventDefault();
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <header>
        <div className="d-flex align-items-center">
          <a
            href="#"
            className={`menu ${menu ? 'active' : undefined}`}
            onClick={toggleMenu}
          >
            <i className="bi bi-sliders"></i>
          </a>
        </div>
        <div className="userItems">
          <a href="#" className="icon">
            <i className="bi bi-heart-fill"></i>
            <span className="like">0</span>
          </a>
          <a href="#" className="icon" onClick={toggleCart}>
            <i className="bi bi-bag-fill"></i>
            <span className="bag">{bag.length}</span>
          </a>
          <div className="avatar">
            <a href="#" onClick={toggleProfile}>
              <img src={userImg} alt="User Image" />
            </a>
            <div className="user">
              <span>User Name</span>
              <a href="#" onClick={toggleProfile}>Ver Perfil</a>
            </div>
          </div>
        </div>
      </header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {isProfileOpen && <UserProfile onClose={() => setIsProfileOpen(false)} />}
    </>
  );
}

export default Header;
