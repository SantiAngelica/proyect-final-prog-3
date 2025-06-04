import React, { useEffect, useState, useContext, use } from 'react'
import { AuthenticationContext } from '../../services/auth.context.jsx'
import {ContainerStyle} from '../../styles/Container.jsx'


function MyProperty({ setHasProperty }) {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useContext(AuthenticationContext)
    useEffect(() => {
        fetch('http://localhost:8080/api/properties/my-property', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (!res.ok) {
                if (res.status == 404) {
                    setHasProperty(false);
                    return null
                }
                throw new Error('Error al obtener la propiedad');
            }
  
            return res.json();
        }).then((data) => {
            if (data) {
                setProperty(data);
                setLoading(false);
            }
        }).catch((err) => {
            setLoading(false);
            setError(err.message || 'Error al cargar la propiedad');
        })
    }, [token])

    if (loading)
        return (
            <div className={ContainerStyle}>
                <p>Cargando...</p>
            </div>
        );
    if (error)
        return (
            <div className={ContainerStyle}>
                <p className="text-red-500">{error}</p>
            </div>
        );

    return (
        <div>MyProperty</div>
    )
}

export default MyProperty