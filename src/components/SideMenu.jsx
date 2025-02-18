import React, { useState } from 'react';
import './sideMenu.css';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';

function SideMenu({ active, sectionActive }) {
  const [navData, setNavData] = useState(navListData);
  const [socialOpen, setSocialOpen] = useState(false);

  const handleNavOnClick = (id, target) => {
    const newNavData = navData.map(nav => {
      nav.active = false;
      if (nav._id === id) nav.active = true;
      return nav;
    });
    sectionActive(target);
    setNavData(newNavData);
  };

  const toggleSocial = () => {
    setSocialOpen(!socialOpen);
  };

  return (
    <div className={`sideMenu ${active ? 'active' : undefined}`}>
      <a href="/" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Play</span>
      </a>
      <ul className="nav">
        {navData.map(item => (
          <NavListItem
            key={item._id}
            item={item}
            navOnClick={handleNavOnClick}
          />
        ))}
      </ul>

      <div className="social-container">
        <button className={`share-button ${socialOpen ? 'active' : ''}`} onClick={toggleSocial}>
          <i className="bi bi-share"></i>
        </button>
        <ul className={`social ${socialOpen ? 'open' : ''}`}>
          <li>
            <a href="#" className="facebook">
              <i className="bi bi-meta"></i>
            </a>
          </li>
          <li>
            <a href="#" className="twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
          </li>
          <li>
            <a href="#" className="youtube">
              <i className="bi bi-youtube"></i>
            </a>
          </li>
          <li>
            <a href="#" className="share">
              <i className="bi bi-share"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
