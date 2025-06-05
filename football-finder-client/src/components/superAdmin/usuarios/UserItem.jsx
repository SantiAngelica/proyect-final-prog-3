import React, { useState, useContext } from "react";
import styled from "styled-components";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import Button1 from "../../styles/Button1.jsx";
import RedButton from "../../styles/RedButton.jsx";
import {
  CardContainer,
  TittleCard,
  SubTittleCard,
  inputStyle,
} from "../../styles/Cards.jsx";

const UserItem = ({ user, onUserDelete }) => {
  const [role, setRole] = useState(user.rol);
  const { token } = useContext(AuthenticationContext);
  const handleChange = (e) => {
    setRole(e.target.value.toLowerCase());
  };

  const handleClickRol = async () => {
    if (!token) {
      errorToast("No token found, please Log in");
    }
    if (role != "player" && role != "admin") {
      errorToast("Invalid role");
      return;
    }
    fetch(`http://localhost:8080/api/users/rolechange/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed");
        }
        return res.json;
      })
      .then((data) => {
        successToast("Rol updated!");
        onUserDelete(user.id);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err);
      });
  };

  const handleClickDlt = async () => {
    fetch(`http://localhost:8080/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed");
        }
        successToast("User Deleted!");
        return res.json;
      })
      .catch((err) => {
        console.log(err);
        errorToast(err);
      });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <span className={TittleCard}>{user.name}</span>
      <input className={inputStyle} value={role} onChange={handleChange} />

      <div className="flex flex-col items-start gap-4">
        <Button1 onClick={handleClickRol}>Cambiar rol</Button1>
        <RedButton onClick={handleClickDlt}>Borrar usuario</RedButton>
      </div>
    </div>
  );
};

export default UserItem;
