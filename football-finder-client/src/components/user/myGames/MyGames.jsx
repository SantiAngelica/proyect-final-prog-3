import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../services/auth.context'
import { errorToast } from '../../toast/NotificationToast'

function MyGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useContext(AuthenticationContext)

  useEffect(() => {
    fetch('http://localhost:8080/api/users/my-games', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (!res.ok) {
        console.log("teta")
        errorToast('Error al cargar los juegos')
        setError(false)
        return
      }
      return res.json()
    }).then(data => {
      if(data) setGames(data)
      setLoading(false)
    }).catch(err => {
      setError(true)
      errorToast('Error al cargar los juegos')
    })
  })

  if (loading) return <p>Cargando mis juegos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>

      {loading && <p>Cargando juegos...</p>}
      {error && <p>Error al cargar los juegos.</p>}
      {games.length === 0 && !loading && <p>No tienes juegos creados.</p>}
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <h2>predio: {game.reservation.fieldType.property.name}</h2>
            <p>{game.description}</p>
            <p>Fecha: {game.reservation.date}</p>
            <p>Hora: {game.reservation.schedule.schedule}hs</p>
            <p>Jugadores restantes: {game.missing_players}</p>
            <a href={`/user/users-list/${game.id}`} className='text-blue-500 hover:underline'>Invitar jugadores</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyGames