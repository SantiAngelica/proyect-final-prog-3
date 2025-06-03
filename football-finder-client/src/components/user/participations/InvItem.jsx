import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthenticationContext } from '../../services/auth.context'
import { errorToast, successToast } from '../../toast/NotificationToast'

function InvItem({ inv, onAccept }) {
    const { token } = useContext(AuthenticationContext)
   
    const handleAcept = () => {
        fetch(`http://localhost:8080/api/participations/acepted-invitation/${inv.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 400) {
                errorToast('El partido ya está completo')
                return
            }
            if (!res.ok) {
                errorToast('Error al aceptar la invitación')
                return
            }
            return res.json()
        }).then(data => {
            if (!data) return
            successToast('Invitación aceptada correctamente')
            onAccept(inv.id) 
        }).catch(err => {
            errorToast('Error al aceptar la invitación')
            console.error(err)
        })
    }

    return (
        <>

            <p><strong>Dia y hora:</strong> {inv.gameInvited.reservation.date} - {inv.gameInvited.reservation.schedule.schedule}hs</p>

            <p><strong>Cancha:</strong> {inv.gameInvited.reservation.schedule.property.zone} - {inv.gameInvited.reservation.schedule.property.adress}</p>

            <p><strong>Te invito:</strong> {inv.gameInvited.userCreator.name}</p>

            <p><strong>Estado:</strong> {inv.state}</p>

            <button onClick={handleAcept} className='bg-blue-500 text-white rounded px-2 py-1 mt-4'>Aceptar invitacion</button>

        </>
    )
}

export default InvItem