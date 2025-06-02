import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { errorToast, successToast } from '../../toast/NotificationToast';
import { AuthenticationContext } from '../../services/auth.context.jsx';

const UserItem = ({ user }) => {
    const [role, setRole] = useState(user.rol)
    const { token } = useContext(AuthenticationContext)
    const handleChange = (e) => {
        setRole(e.target.value.toLowerCase())
    }

    const handleClickRol = async () => {
        if(!token){
            errorToast('No token found, please Log in')
        }
        if (role != 'player' || role != 'admin') {
            errorToast('Invalid role')
            return
        }
        fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            if(!res.ok){
                errorToast('Failed')
            }
            return res.json
        })
        .then((data) => {
            successToast('Rol updated!')
        })
        .catch((err) => {
            console.log(err)
        })

    }

    

    return (
        <StyledWrapper>
            <div className="card">
                <span>{user.name}</span>
                <input className="job" value={role} onChange={handleChange} />

                <button> Cambiar rol
                </button>
                <button className='delete'> Borrar
                </button>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
   width: 190px;
   height: 254px;
   background: #3405a3;
   border-radius: 15px;
   box-shadow: 1px 5px 60px 0px #100a886b;
  }

  .card .card-border-top {
   width: 60%;
   height: 3%;
   background: #6b64f3;
   margin: auto;
   border-radius: 0px 0px 15px 15px;
  }

  .card span {
   font-weight: 600;
   color: white;
   text-align: center;
   display: block;
   padding-top: 10px;
   font-size: 16px;
  }

  .card .job {
   font-weight: 400;
   color: white;
   display: block;
   text-align: center;
   padding-top: 3px;
   font-size: 12px;
   width: 80%;
   margin: auto
  }

  .card .img {
   width: 70px;
   height: 80px;
   background: #6b64f3;
   border-radius: 15px;
   margin: auto;
   margin-top: 25px;
  }

  .card button {
   padding: 8px 25px;
   display: block;
   margin: auto;
   border-radius: 8px;
   border: none;
   margin-top: 30px;
   background: #6b64f3;
   color: white;
   font-weight: 600;
  }
  

  .card button:hover {
   background: #534bf3;
  }
.card .delete {
   background: red
  }
  
  
  `


    ;

export default UserItem;
