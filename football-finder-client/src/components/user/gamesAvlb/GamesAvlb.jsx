
import React, { useEffect, useState, useContext } from 'react'
import { AuthenticationContext } from '../../services/auth.context.jsx';
import GameItem from './GameItem.jsx';
import { jwtDecode } from 'jwt-decode';

function GamesAvlb() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthenticationContext)
  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }
    const decoded = jwtDecode(token);
    fetch('http://localhost:8080/api/games/availables', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch games');
        }
        return res.json();
      })
      .then((data) => {
        console.log(decoded, data)
        const filteredGames = data.filter(game => game.id_user_creator !== decoded.id);
        setGames(filteredGames)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setError('Error loading games.');
        setLoading(false);
      });
  }, [token])
  if (loading) return <p>Loading games...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (games.length === 0) return <p className="text-red-500">No hay juegos disponibles.</p>;



  return (
    <div className='games-container'>
      {games.map(game => (
        <div key={game.id} >
          <GameItem game={game} />
        </div>
      ))}
    </div>
  )
}

export default GamesAvlb