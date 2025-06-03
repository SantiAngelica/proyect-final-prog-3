import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { AuthenticationContext } from '../../services/auth.context';
import { errorToast, successToast } from '../../toast/NotificationToast';

function UserItem({user}) {
    const { gid } = useParams(); 
    const {token} = useContext(AuthenticationContext)

    const handleInvite = () => {
        console.log("first")
        fetch(`http://localhost:8080/api/participations/invitation/${gid}/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (!res.ok) {
                errorToast('Error al enviar la invitacion');
            }
            successToast('Invitacion enviada!');
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <p>{user.name}</p>
            {user.positions.map((pos, index) => (
                <span key={index} className='text-sm text-gray-500'>
                    {pos.position}{index < user.positions.length - 1 ? ', ' : ''}
                </span>
            ))}
            <br />
            {user.fieldsType.map((field, index) => (
                <span key={index} className='text-sm text-gray-500'>
                    {field.field}{index < user.fieldsType.length - 1 ? ', ' : ''}
                </span>
            ))}
            <p>{user.zone}</p>
            <button className='text-blue-500 hover:underline' onClick={handleInvite}>Invitar</button>
        </div>
    )
}

export default UserItem