import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../services/auth.context.jsx'
import { errorToast } from '../../toast/NotificationToast.jsx'

const Profile = () => {
  const {token} = useContext(AuthenticationContext)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/users/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }})
    .then(res => {
      if (!res.ok) {
        errorToast('Error al obtener el perfil del usuario')
        setError('Error al obtener el perfil del usuario')  
      }
      return res.json()
    }).then(data => { 
      setUser(data)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      errorToast('Error al obtener el perfil del usuario')
      setError('Error al obtener el perfil del usuario')
      setLoading(false)
    })
  }, [])


  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div> 
      <h2 className="text-lg font-bold mb-4">Perfil de Usuario</h2>
      <div className="profile-info">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Edad:</strong> {user.age}</p>
        <p><strong>Zona:</strong> {user.zone}</p>
        <p><strong>Posiciones:</strong> {user.positions.map(pos => pos.position).join(', ')}</p>
        <p><strong>Canchas:</strong> {user.fieldsType.map(field => field.field).join(', ')}</p>
        <p><strong>Comentarios:</strong> {user.comments.map(field => field.field).join(', ')}</p>
      </div>
      <div className="mt-4">
        <a href={`/user/update/${user.id}`} className="text-blue-500 hover:underline">Actualizar perfil</a>
      </div>
      <div className="mt-4">
        <button className="text-red-500 hover:underline">Borrar perfil</button>
      </div>
    </div>
  )
}

export default Profile