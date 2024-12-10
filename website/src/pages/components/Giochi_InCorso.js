import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Giochi_InCorso() {

  const [giochiinCorso, setGiochiinCorso] = useState([]);
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
    <>
    {giochiinCorso.map((row) => {
      return (
        <div className='singleGame'>
        <div className='singleGameImage'> 
          <img src={row.videogame.background_image} />
        </div>
        <p className='singleGameName'>{row.videogame.name}</p>
        </div>
      )})}
    </>
  )
}
  

export default Giochi_InCorso