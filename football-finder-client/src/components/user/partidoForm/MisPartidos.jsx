import React, { useEffect, useState } from 'react'

const MisPartidos = ({userId}) => {
 const [partidos,setPartidos] = useState([])
 const [loading, setLoading] = useState(true)
 useEffect(() => {
 fetch(`http://localhost:5000/api/users/${userId}/games`) 
 .then(res => res.json())
 .then(data =>{
    setPartidos(data)
    setLoading(false)
 })
 .catch(err => {
    console.error(err)
    setLoading(false)
 })

}, [userId]);
if (loading) return <p>cargando historial...</p>
  return (
    <div>
        <h2>Historial de Partidos</h2>
        {partidos.length === 0 ? (<p>No hay partidos registrados </p>) : 
        (<ul>
            {
            partidos.map(p => (
                <li key={p.id}>
                    {p.fecha} - {p.hora} - {p.predio}

                </li>
            ))} 
        </ul>)}
       
    </div>
  )
}

export default MisPartidos