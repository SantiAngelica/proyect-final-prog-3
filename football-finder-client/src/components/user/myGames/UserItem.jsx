import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import Button1 from "../../styles/Button1";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards";

function UserItem({ user }) {
  const { gid } = useParams();
  const { token } = useContext(AuthenticationContext);

  const handleInvite = () => {
    console.log("first");
    fetch(
      `http://localhost:8080/api/participations/invitation/${gid}/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al enviar la invitacion");
        }
        successToast("Invitacion enviada!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col items-start w-full">
      <p className={TittleCard}>{user.name}</p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Posiciones:</strong>
        {user.positions.map((pos, index) => (
          <span key={index}>
            {pos.position}
            {index < user.positions.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Canchas:</strong>
        {user.fieldsType.map((field, index) => (
          <span key={index}>
            {field.field}
            {index < user.fieldsType.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className={inputStyle}>
        <strong className={colorStrong}>Zona:</strong>
        {user.zone}
      </p>
      <Button1 className="text-blue-500 hover:underline" onClick={handleInvite}>
        Invitar
      </Button1>
    </div>
  );
}

export default UserItem;
