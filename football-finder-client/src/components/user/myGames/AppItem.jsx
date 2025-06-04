import React from 'react'
import { useContext } from 'react'
import { AuthenticationContext } from '../../services/auth.context'
import { errorToast, successToast } from '../../toast/NotificationToast'
import { inputStyle } from '../../styles/Cards'
import Button1 from '../../styles/Button1'

function AppItem({ application, onAcceptApplication }) {
    const { token } = useContext(AuthenticationContext)

    const handleAcceptApp = async () => {
        fetch(`http://localhost:8080/api/participations/acepted-application/${application.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 400) {
                        return res.json().then((data) => {
                            throw new Error(data.message || "Error al aplicar para el juego");
                        })
                    }
                    throw new Error('Error al aceptar la solicitud')
                }
                return res.json()
            })
            .then((data) => {
                if (data) {
                    successToast('Solicitud aceptada correctamente')
                    onAcceptApplication(application.id, application.userApplicant)
                }
            })
            .catch((err) => {
                errorToast(err.message)
            })
    }
    return (
        <li key={application.id} className={inputStyle}>
            {application.userApplicant.name} ({application.userApplicant.email})
            <Button1 onClick={handleAcceptApp}>Aceptar</Button1>
        </li>
    )
}

export default AppItem