import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Giochi_InCorso() {

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
    <>
    {giochiinCorso.map((row) => {
      return (
        <div className='singleGame'>
        <div className='singleGameImage'> 
          <img src={row.videogame.background_image} />
        </div>
        <p className='singleGameName'>{row.videogame.name}</p>
        <button onClick={() => onRemove(row.id)}>-</button>
        </div>
      )})}
    </>
  )
}
  

export default Giochi_InCorso