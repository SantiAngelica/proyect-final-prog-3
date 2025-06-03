import styled from 'styled-components';
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/auth.context.jsx';
import { errorToast, successToast } from '../../toast/NotificationToast.jsx';


const GameItem = ({ game }) => {
  const { token } = useContext(AuthenticationContext)

  const handleApply = async () => {
    fetch(`http://localhost:8080/api/participations/application/${game.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          errorToast('Error al aplicar para el juego');
        }
        return response.json();
      })
      .then(data => {
        successToast('Postulacion enviada correctamente');
      })
      .catch(error => {
        errorToast(error.message);
      })
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
        <button className='delete' onClick={handleApply}>Aplicar</button>
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


  }


  .content-1 {

    border-radius: 12px;
 

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
   background: blue
  }
   
  button:hover {
   cursor: pointer;
  }
`

export default GameItem;