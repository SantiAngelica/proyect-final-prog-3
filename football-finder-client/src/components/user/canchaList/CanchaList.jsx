import React, { useEffect, useState } from 'react'

const CanchaList = () => {
    const [canchas, setCanchas] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/api/fields')
      .then(res => res.json())
      .then(data => {
        setCanchas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar canchas:', err);
        setLoading(false);
      });
  }, []); 
  if (loading) return <p>cargando canchas</p>
    
  return (
    <div>
        <h2>lista de canchas</h2>
        {
            canchas.length === 0 ? ( <p>no hay canchas registradas</p> ) :
            ( <ul>
                {canchas.map((c,index) => {
                    <li key= {index} >
                        {c.field}
                    </li>
                })}
            </ul> )
        }
    </div>
  )
}

export default CanchaList