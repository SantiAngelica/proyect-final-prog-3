import React from 'react'

function AppItem({ app }) {
    return (
        <>

            <p><strong>Dia y hora:</strong> {app.gameApplied.reservation.date} - {app.gameApplied.reservation.schedule.schedule}hs</p>
            <p><strong>Cancha:</strong> {app.gameApplied.reservation.schedule.property.zone} - {app.gameApplied.reservation.schedule.property.adress}</p>
            <p><strong>Partido de:</strong> {app.gameApplied.userCreator.name}</p>
            <p><strong>Estado:</strong> {app.state}</p>

        </>
    )
}

export default AppItem