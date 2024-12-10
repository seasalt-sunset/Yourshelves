import React, { useEffect, useState, useContext } from 'react'
import '../../styles/AddVideogames.css'
import axios from "axios"
import { AuthContext } from '../../services/AuthContext'

function AddVideogames() {

  const [games, setGames] = useState([])
  const { auth } = useContext(AuthContext)
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

  const onChangeInput = async (e) => {
    let response = await axios.get(process.env.REACT_APP_SERVER_URL + "/videogames/" + e.target.value)
    if (response?.data) {
      setGames(response.data)
    }
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
          <div className='singleGame'>
          <div className='singleGameImage'> 
            <img src={row.background_image} />
          </div>
          <p className='singleGameName'>{row.name}</p>
          <button onClick={
            async() => {
              let response = await axios.post(process.env.REACT_APP_SERVER_URL + "/giochi_inCorso",
              {
                userId: auth.id,
                gameId: row.id
              },
              {
                headers: {
                  authToken: localStorage.getItem("AuthToken")
                }
              })


            console.log(response.data);
          }}>+</button>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default AddVideogames