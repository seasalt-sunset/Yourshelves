import React from 'react'
import axios from 'axios'
import '../../styles/Giochi_InCorso.css'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../services/AuthContext'
import Scaff from '../../assets/images/scaffale.svg';
import MenuIcon from '../../assets/images/menu_icon.svg';
import Logo from '../../assets/images/y.svg';
import { useNavigate } from 'react-router-dom';
function Giochi_InCorso() {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext)
  const { setAuth } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const [games, setGames] = useState([])
  
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

  const [giochiinCorso, setGiochiinCorso] = useState([]);
  const onRemove = async (id) => {
    await axios.delete(process.env.REACT_APP_SERVER_URL + "/giochi_inCorso/" + id
    , {
      headers: {
      authToken: localStorage.getItem("AuthToken")
    }
  })

  setGiochiinCorso(giochiinCorso.filter((gioco) => {
return gioco.id != id
  }))


  }
  
  useEffect(() => {
    fetchData()
  }, [])

 
  const fetchData = async () => {
    let response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/giochi_inCorso",
      {
        headers: {
        authToken: localStorage.getItem("AuthToken")
      }}
    )

    console.log(response.data)
    setGiochiinCorso(response.data)
  }
  
  return (
    <div className="addVideogames">
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
          <div>
             {/* Logo */}
            <div className="logoContainer">
            </div>

            {/* Scaffali */}
            <div className="divScaffale" id="addDivScaffali">
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <img className="scaffaleAdded" id="addScaffale" src={Scaff} alt="Scaffale" />
              <div className = "divAllGames">
              {giochiinCorso.map((row) => {
                return (
                  <div className='singleGame'>
                  <div id='singleGameImageAdded'> 
                    <img src={row.videogame.background_image} />
                  </div>
                  <button className='singleGameButton' id='singleGameButtonRemove' onClick={() => onRemove(row.id)}>{row.videogame.name}</button>
                  </div>
                )})}
              </div>
          </div>
        </div>
      </div>
  )
}

export default Giochi_InCorso