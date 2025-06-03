import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/auth.context.jsx';
import { errorToast, successToast } from '../../toast/NotificationToast.jsx';


const GameItem = ({ game }) => {
    const { token } = useContext(AuthenticationContext)

    const handleDelete = async () => {
        console.log("first")
        fetch(`http://localhost:8080/api/games/${game.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast('Failed to delete game');
                    return;
                }
                successToast('Game deleted successfully');
                window.location.reload();
            })
            .catch((err) => {
                console.error('Error deleting game:', err);
            });
    }



    return (
        <StyledWrapper>
            <div className="card">
                <label className="info">
                    <span className="info-1">{game.userCreator.name}</span>
                    <span className="info-1">{game.reservation.fieldType.property.name}</span>
                </label>
                <div className="content-1">
                    <span className='info-1'>Date:{game.reservation.date} - {game.reservation.schedule.schedule}hs</span>
                    <span className='info-1'>Zone:{game.reservation.fieldType.property.zone}</span>
                    <span className='info-1'>Adress:{game.reservation.fieldType.property.adress}</span>
                </div>
                <button className='delete' onClick={handleDelete}>Borrar</button>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    border-radius: 44px;
    background: lightgrey;
    background:  #3405a3;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;

  .info {
    display: inline-block;
    vertical-align: top;
    padding: 10px;
  }

  .info-1{
    display: inline-block;
    height: 20px;
    width: 100%;
    border-radius: 6px;
    background: rgba(255,255,255,0.9);

  }


  .content-1 {

    border-radius: 12px;
    background: rgba(255,255,255,0.9);

    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
  }
    button {
   padding: 8px 25px;
   display: block;
   margin: auto;
   border-radius: 8px;
   border: none;
   margin-top: 30px;

   color: white;
   font-weight: 600;
  }
.delete {
   background: red
  }
   
  button:hover {
   cursor: pointer;
  }
`

export default GameItem;
