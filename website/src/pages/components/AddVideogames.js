import React, { useEffect, useState, useContext } from 'react'
import '../../styles/AddVideogames.css'
import axios from "axios"
import { AuthContext } from '../../services/AuthContext'
import Scaff from '../../assets/images/scaffale.svg';
import MenuIcon from '../../assets/images/menu_icon.svg';
import Logo from '../../assets/images/y.svg';
import { useNavigate } from 'react-router-dom';

function AddVideogames() {

  const [games, setGames] = useState([])
  const { auth } = useContext(AuthContext)
  useEffect(() => {
    fetchGames();
  }, [])
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
  
  const fetchGames = async () => {
    let response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/videogames"
    )

    console.log(response.data);
    setGames(response.data)

  }

  const onChangeInput = async (e) => {
    let response = await axios.get(process.env.REACT_APP_SERVER_URL + "/videogames/" + e.target.value)
    if (response?.data) {
      setGames(response.data)
    }
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
        
        <input className="inputGame" type="text" onChange={
          onChangeInput
        }/>
        
        {/* Scaffali */}
        <div className="divScaffale" id="addDivScaffali">
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <img className="scaffaleAdd" id="addScaffale" src={Scaff} alt="Scaffale" />
          <div className = "divAllGames">
            {games.map((row) => {
              return (
                <div className='singleGame'>
                <div className='singleGameImage'> 
                  <img src={row.background_image} />
                </div>
                <button className='singleGameButton' onClick={
                async() => {
                  try {
                    let response = await axios.post(
                      process.env.REACT_APP_SERVER_URL + "/giochi_inCorso",
                      {
                        userId: auth.id,
                        gameId: row.id
                      },
                      {
                        headers: {
                          authToken: localStorage.getItem("AuthToken")
                        }
                      }
                    );
                    console.log('Game added successfully:', response.data);
                    // You can add success feedback here, like an alert or toast notification
                  } catch (error) {
                    console.error('Error adding game:', error);
                    if (error.response) {
                      // The server responded with an error status code
                      console.error('Response data:', error.response.data);
                      console.error('Response status:', error.response.status);
                    } else if (error.request) {
                      // The request was made but no response was received
                      console.error('No response received from server');
                    } else {
                      // Something else caused the error
                      console.error('Error message:', error.message);
                    }
                    // You can add user feedback here, like an alert or toast notification
                    alert('Errore nell\'aggiungere il gioco. Per favore riprova.');
                  }
                }
              }>
                {row.name}
              </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddVideogames