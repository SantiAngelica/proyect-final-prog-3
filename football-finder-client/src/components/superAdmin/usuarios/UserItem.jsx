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

import useConfirmModal from "../../../hooks/useConfirmModal"; // <-- importamos el hook

const UserItem = ({ user, onUserDelete }) => {
  const [role, setRole] = useState(user.rol);
  const { token } = useContext(AuthenticationContext);

  // Usamos el hook
  const { Modal, show } = useConfirmModal();

  const handleChange = (e) => {
    setRole(e.target.value.toLowerCase());
  };

  const updateRole = () => {
    if (!token) {
      errorToast("No token found, please Log in");
      return;
    }
    if (role !== "player" && role !== "admin") {
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
        return res.json(); // <-- corregí: falta paréntesis para llamar la función json
      })
      .then((data) => {
        successToast("Rol updated!");
        onUserDelete(user.id);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message || err);
      });
  };

  const deleteUser = () => {
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
        onUserDelete(user.id);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message || err);
      });
  };

  const handleClickRol = () => {
    show({
      title: "¿Estás seguro que deseas cambiar de rol?",
      message: `Se cambiará el rol de ${user.name}.`,
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: () => {
        updateRole();
      },
    });
  };

  const handleClickDlt = () => {
    show({
      title: "¿Estás seguro que deseas borrar este usuario?",
      message:
        "Esta acción no se puede deshacer y se eliminará todo su historial.",
      confirmText: "Borrar",
      cancelText: "Cancelar",
      onConfirm: () => {
        deleteUser();
      },
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

      <Modal />
    </div>
  );
};

export default UserItem;
