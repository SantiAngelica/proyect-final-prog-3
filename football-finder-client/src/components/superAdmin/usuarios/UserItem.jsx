import React, { useState, useContext } from "react";
import styled from "styled-components";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import Button1 from "../../styles/Button1.jsx";
import Button from "../../styles/Button.jsx";

const UserItem = ({ user }) => {
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
          errorToast("Failed");
          return;
        }
        return res.json;
      })
      .then((data) => {
        successToast("Rol updated!");
      })
      .catch((err) => {
        console.log(err);
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
          errorToast("Failed");
          return;
        }
        successToast("User Deleted!");
        window.location.reload();
        return res.json;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center border border-gray-300 p-4 rounded-lg shadow-md">
      <span className="text-lg font-semibold mb-1">{user.name}</span>
      <input
        className="font-semibold text-center text-blue-500 bg-gray-200 p-1 rounded-md mb-6"
        value={role}
        onChange={handleChange}
      />

      <div className="flex flex-col items-center gap-2">
        <Button1 onClick={handleClickRol}> Cambiar rol</Button1>
        <Button onClick={handleClickDlt}> Borrar</Button>
      </div>
    </div>
  );
};

export default UserItem;
