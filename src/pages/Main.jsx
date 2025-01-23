import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import './main.css';
import Header from './Header';
import SideMenu from '../components/SideMenu';
import Home from './Home';
import Categories from './Categories';
import MyLibrary from './MyLibrary';
import Streaming from './Streaming';

function Main() {
  const { library } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const streamingRef = useRef();

  const sections = [
    {
      name: 'home',
      ref: homeRef,
      active: true,
    },
    {
      name: 'categories',
      ref: categoriesRef,
      active: false,
    },
    {
      name: 'library',
      ref: libraryRef,
      active: false,
    },
    {
      name: 'streaming',
      ref: streamingRef,
      active: false,
    }
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = target => {
    sections.map(section => {
      section.ref.current.classList.remove('active');
      if (section.ref.current.id === target) {
        section.ref.current.classList.add('active');
      }
      return section;
    });
  };

  const fetchData = () => {
    fetch('http://localhost:3000/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? 'active' : undefined}`}>
        <Header toggleActive={handleToggleActive} />
        <div className="contain-fluid">
          {games && games.length > 0 && (
            <Home games={games} reference={homeRef} />
          )}
          {games && games.length > 0 && (
            <Categories games={games} reference={categoriesRef} />
          )}
          {games && games.length > 0 && (
            <MyLibrary games={library} reference={libraryRef} />
          )}
          <Streaming reference={streamingRef} />
        </div>
      </div>
    </main>
  );
}

export default Main;
