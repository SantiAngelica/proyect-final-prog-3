import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import Button1 from "../../styles/Button1.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import {
  CardContainer,
  TittleCard,
  inputStyle,
  colorStrong,
} from "../../styles/Cards.jsx";

import useConfirmModal from "../../../hooks/useConfirmModal";

const PendingList = () => {
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useContext(AuthenticationContext);

  const { Modal, show } = useConfirmModal();

  useEffect(() => {
    fetch("http://localhost:8080/api/properties/games", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            return res.json().then((data) => {
              throw new Error(data.message || "Error al obtener los partidos");
            });
          }
          throw new Error("Error al obtener los partidos");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          const filteredGames = data.filter(
            (game) => game.reservation.state === "pendiente"
          );
          setPendientes(filteredGames);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [token]);

  const aceptarReserva = (rid) => {
    show({
      title: "Confirmar aceptación",
      message: "¿Querés aceptar esta reserva?",
      confirmText: "Aceptar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/properties/${rid}/acepted`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) {
            if (res.status === 400) {
              const data = await res.json();
              throw new Error(data.message || "Error al aceptar la reserva");
            }
            throw new Error("Error al aceptar la reserva");
          }
          const data = await res.json();
          if (data) {
            setPendientes((prev) => prev.filter((r) => r.id !== rid));
            successToast("Reserva aceptada correctamente");
          }
        } catch (err) {
          errorToast(err.message || "Error al aceptar la reserva");
        }
      },
    });
  };

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando reservas...</p>
      </div>
    );

  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">Error al cargar las reservas</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Reservas Pendientes</h2>
        {pendientes.length === 0 ? (
          <p>No hay reservas pendientes</p>
        ) : (
          <ul className="flex flex-col w-full gap-12">
            {pendientes.map((game) => (
              <li
                key={game.id}
                className="border-2 border-gray-500 p-4 rounded-lg"
              >
                <p className={inputStyle}>
                  <strong className={colorStrong}>Día y hora: </strong>
                  {game.reservation.date} - {game.reservation.schedule.schedule}
                  :00
                  <strong className={colorStrong}> hs</strong>
                </p>
                <p className={inputStyle}>
                  <strong className={colorStrong}>Cancha: </strong>
                  {game.reservation.fieldType.field_type}
                </p>
                <p className={inputStyle}>
                  <strong className={colorStrong}>Estado: </strong>
                  {game.reservation.state}
                </p>
                <p className={inputStyle}>
                  <strong className={colorStrong}>A nombre de: </strong>
                  {game.userCreator.name}
                </p>
                <Button1 onClick={() => aceptarReserva(game.id)}>
                  Aceptar
                </Button1>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal />
    </div>
  );
};

export default PendingList;
