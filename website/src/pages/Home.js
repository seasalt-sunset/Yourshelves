import React, { useContext, useState } from 'react';
import { AuthContext } from '../services/AuthContext';
import '../styles/Home.css';
import Scaff from '../assets/images/scaffale.svg';
import MenuIcon from '../assets/images/menu_icon.svg';
import Logo from '../assets/images/y.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className="Home">
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Top Menu Bar */}
      <div className="menuBar">
        <img className="menuIcon" src={MenuIcon} alt="Menu" onClick={toggleSidebar} />
        <img className="logo" src={Logo} alt="Logo" onClick={() => navigate('/home')}/>
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/giochi_inCorso')}>Giochi in Corso</button>
        <button onClick={() => navigate('/addVideogames')}>Aggiungi Videogiochi</button>
      </div>

      {/* Logo */}
      <div className="logoContainer">
      </div>

      {/* Scaffali */}
      <div className="divScaffale">
        <img className="scaffale" src={Scaff} alt="Scaffale" />
        <img className="scaffale" src={Scaff} alt="Scaffale" />
        <img className="scaffale" src={Scaff} alt="Scaffale" />
        <img className="scaffale" src={Scaff} alt="Scaffale" />
      </div>
    </div>
  );
}

export default Home;
