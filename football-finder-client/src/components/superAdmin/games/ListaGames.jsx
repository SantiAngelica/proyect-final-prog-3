
import React, { useEffect, useState, useContext } from 'react'
import { AuthenticationContext } from '../../services/auth.context.jsx';

function ListaGames() {
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
        setGames(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setError('Error loading games.');
        setLoading(false);
      });
  }, [])
  if (loading) return <p>Loading games...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className='games-container'>

    </div>
  )
}

export default ListaGames