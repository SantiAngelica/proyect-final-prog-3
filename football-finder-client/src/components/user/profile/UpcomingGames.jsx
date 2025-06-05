import React, { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../../services/auth.context'
import { errorToast } from '../../toast/NotificationToast.jsx'

function UpcomingGames() {
    const { token } = useContext(AuthenticationContext)
    const [loading, setLoading] = React.useState(true)
    const [games, setGames] = React.useState([])
    const [error, setError] = React.useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/api/users/play-in', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error fetching upcoming games')
                }
                return res.json()
            })
            .then(data => {
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0); 
        
                const gamesFiltrados = data.filter((game) => {
                    const fechaJuego = new Date(game.game.reservation.date + "T00:00:00");
                    return fechaJuego >= hoy;
                });
                setGames(gamesFiltrados)
                setLoading(false)
            })
            .catch(err => {
                errorToast('Error fetching upcoming games')
                setError(err)
                console.error('Error:', err)
            })
    }, [])


    if (loading) return <p>Cargando datos del usuario...</p>;
    if (error) return <p className="text-red-500">{error}</p>;



    return (
        <div>
            {games.length > 0 && (
                <ul className="list-disc pl-5">
                    <h2 className="text-lg font-bold mb-4">Próximos Partidos</h2>
                    {games.map(game => (
                        <li key={game.game.id} className="mb-4">
                            <p><strong>Fecha:</strong> {game.game.reservation.date}</p>
                            <p><strong>Hora:</strong> {game.game.reservation.schedule.schedule}:00hs</p>
                            <p><strong>Cancha:</strong> {game.game.reservation.fieldType.property.zone} - {game.game.reservation.fieldType.property.adress}</p>
                            <p><strong>Creador:</strong> {game.game.userCreator.name}</p>
                            <p><strong>Tipo de cancha:</strong> {game.game.reservation.fieldType.field_type}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UpcomingGames