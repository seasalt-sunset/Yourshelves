import React from 'react'
import '../styles/Home.css'
import Scaff from '../assets/images/scaffale.svg'
import MenuIcon from '../assets/images/menu_icon.svg'
import Logo from '../assets/images/y.svg'
import AddVideogames from './components/AddVideogames'
import Giochi_InCorso from './components/Giochi_InCorso'
function Home() {
  return (
    <div className="Home">
      <div className= "menuBar">
      <img className='menuIcon' src= {MenuIcon}/>
      <img className='logo' src= {Logo}/>
      <p> </p>
      </div>
      <div><Giochi_InCorso/></div>
      {/* <div><AddVideogames /> </div> */}

      {/* <div className='divScaffale'>
      <img className='scaffale' src= {Scaff} />
      <img className='scaffale' src= {Scaff} />
      <img className='scaffale' src= {Scaff} />
      <img className='scaffale' src= {Scaff} />
      </div> */}
    </div>
  )
}

export default Home