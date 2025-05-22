import React, { useEffect, useState } from 'react';

const MisPartidos = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}/games`)
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading game history...</p>;

  return (
    <div>
      <h2>Game History</h2>
      {games.length === 0 ? (
        <p>No games registered</p>
      ) : (
        <ul>
          {games.map(game => (
            <li key={game.id}>
              {game.date} - {game.schedule} - {game.property_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisPartidos;
