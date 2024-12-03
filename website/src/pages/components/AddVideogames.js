import React, { useEffect, useState } from 'react'
import '../../styles/AddVideogames.css'
import axios from "axios"

function AddVideogames() {

  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGames();
  }, [])
  
  const fetchGames = async () => {
    let response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/videogames"
    )

    console.log(response.data);
    setGames(response.data)

  }

  const onChangeInput = (e) => {
    let response = axios.get (process.env.REACT_APP_SERVER_URL + "/videogames/" + e.target.value)
  }


  return (
    <div>
      <div>
        <input type="text" onChange={
          onChangeInput
        }/>
      </div>
    <div className = "divAllGames">
      {games.map((row) => {
        return (
          <h2 className='singleGame'>{row.name}</h2>
        )
      })}
    </div>
    </div>
  )
}

export default AddVideogames