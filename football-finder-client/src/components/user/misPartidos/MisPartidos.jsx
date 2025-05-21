import React from 'react'

const MisPartidos = () => {
  return (
    <div>
        {
            partidos.map(p => (
                <li key={p.id}>
                    {p.fecha} - {p.hora}
                    {p.predio}

                </li>
            ))
        }
    </div>
  )
}

export default MisPartidos