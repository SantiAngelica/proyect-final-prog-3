import React, { useState, useContext, use } from 'react'
import { replace, useParams } from 'react-router-dom'
import { inputStyle } from '../../../styles/Cards.jsx'
import { isInAWeek } from '../../../utils/validations.js'
import { errorToast, successToast } from '../../../toast/NotificationToast.jsx'

import styled from 'styled-components';

import Button from "../../../styles/Button.jsx";

import { AuthenticationContext } from "../../../services/auth.context.jsx";
import { RxCross1 } from "react-icons/rx";

import { useNavigate } from 'react-router-dom'



function PropertySchedules() {
  const { pid } = useParams()
  const [fieldSchedules, setFieldSchedules] = useState([])
  const [selected, setSelected] = useState({ id_field: 0, id_sch: 0 })
  const [date, setDate] = useState('')
  const navigate = useNavigate();

  const { token } = useContext(AuthenticationContext)

  const getFieldsSchedules = (actualDate) => {
    fetch(`http://localhost:8080/api/properties/property-schedules?date=${actualDate}&pid=${pid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener los horarios de la cancha");
      }
      return res.json();
    }).then((data) => {
      setFieldSchedules(data)
    })
      .catch(err => {
        errorToast(err || "Error al obtener los horarios de la cancha")
      })
  }


  const handleChangeDate = (e) => {
    if (!isInAWeek(e.target.value)) {
      errorToast('La fecha debe ser dentro de una semana')

    } else {
      setDate(e.target.value)
      getFieldsSchedules(e.target.value)
    }
  }


  const createGame = (mp) => {
    fetch('http://localhost:8080/api/games', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        property_id: Number(pid),
        schedule: selected.id_sch,
        field_type: selected.id_field,
        date: date,
        missing_players: mp
      })
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.message || "Error al crear el juego");
        })
      }
      return res.json();
    }).then((data) => {
      successToast('Juego creado correctamente')
      navigate('/user/my-games', { replace: true })
    }).catch(err => {
      console.log(err)
      errorToast(err.message)
    })
  }

  const handleClickReserve = () => {
    //aca habria que abrir un modal, que tenga un input para poner cuantos jugadores faltan, que el modal devuelva el valor del input y si fue confirmado, llame a la funcion 
    //create game
    const missing_player = 5 // lo hice para probar 
    createGame(missing_player)
  }

  return (
    <div className='mt-30 mb-30'>
      <h2>Elije una fecha</h2>
      <input type="date" className={inputStyle} value={date} onChange={handleChangeDate} />
      {date &&
        <div>
          <h2>Horarios disponibles</h2>
          {fieldSchedules.map((field) => (
            <div key={field.id} className='flex flex-column field-container'>
              <span>{field.field_type}</span>
              <StyledWrapper>
                <ul className="list-sch">
                  {field.schedule.map(sch => (
                    <li
                      className={`item-list item-list-button ${!sch.available ? 'not-available' : ''} 
                    ${sch.id == selected.id_sch && field.id == selected.id_field ? 'selected' : ''}`}

                      key={sch.id}

                      onClick={() => setSelected({ id_field: field.id, id_sch: sch.id })}
                    >
                      {sch.schedule}
                      {!sch.available && (
                        <span className="cross-icon"><RxCross1 /></span>
                      )}
                    </li>
                  ))}
                </ul>
              </StyledWrapper>
            </div>
          ))}
          {selected.id_field > 0 && selected.id_sch > 0 ?
            <Button onClick={handleClickReserve}>Reservar</Button>
            :
            //verifico que haya un horario seleccionado, este boton de abajo deveria estar en gris, y sin poder clickearse
            <Button>Reservar</Button>
          }

        </div>
      }
    </div>
  )
}



const StyledWrapper = styled.div`
  .list-sch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }

  .list-sch .item-list {
    position: relative; /* clave para overlay */
    list-style: none;
  }

  .list-sch .item-list-button {
    cursor: pointer;
    padding: 1rem 1rem;
    background-color: #18181b;
    font-size: 0.75rem;
    color: #d9d9d9;
    border: 2px solid #18181b;
    border-radius: 0.25rem;
    transition: all 0.3s ease-in-out;
  }

  .item-list-button:hover {
    border: 2px solid #d9d9d9;
  }

  .item-list-button:focus {
    background-color: #6d28d9;
    border: 2px solid #2e1065;
    box-shadow: inset 0px 1px 4px #2e1065;
  }

  .list-sch .not-available {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none
  }
  .list-sch .not-available:hover {
    border: 2px solid #18181b;
  }

  .list-sch .not-available .cross-icon {
    position: absolute;
    color: #d9d9d9
    cursor: not-allowed;
    font-size: 3.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .list-sch .selected {
    border: 2px solid #3ff825;
   
  }
  .list-sch .selected:hover {
    border: 2px solid #3ff825;
  }

`;


export default PropertySchedules