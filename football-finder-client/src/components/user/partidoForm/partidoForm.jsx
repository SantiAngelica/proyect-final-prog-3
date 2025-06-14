import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import Button1 from "../../styles/Button1.jsx";
import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import useConfirmModal from "../../../hooks/useConfirmModal";

const PartidoForm = () => {
  const [propertyName, setPropertyName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [date, setDate] = useState("");
  const [missingPlayers, setMissingPlayers] = useState("");

  const { token } = useContext(AuthenticationContext);

  const { Modal, show } = useConfirmModal();

  const resetForm = () => {
    setPropertyName("");
    setSchedule("");
    setFieldType("");
    setDate("");
    setMissingPlayers("");
  };

  const handleConfirmCreate = async () => {
    const game = {
      property_name: propertyName,
      schedule,
      field_type: fieldType,
      date,
      missing_players: Number(missingPlayers),
    };

    try {
      const response = await fetch("http://localhost:8080/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        successToast("Partido creado correctamente");
        resetForm();
      } else {
        const err = await response.json();
        errorToast(
          (err.message || "Error desconocido")
        );
      }
    } catch (error) {
      errorToast("Error de conexión: " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!propertyName || !schedule || !fieldType || !missingPlayers || !date) {
      errorToast("Por favor completá todos los campos");
      return;
    }

    show({
      title: "¿Confirmar creación del partido?",
      message:
        "Estás a punto de crear un nuevo partido con los datos ingresados.",
      confirmText: "Crear partido",
      cancelText: "Cancelar",
      onConfirm: () => {
        handleConfirmCreate();
      },
    });
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div className={ContainerStyle}>
      <Modal />

      <div className={CardContainer}>
        <h2 className={TittleCard}>Crear partido</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            name="property_name"
            value={propertyName}
            placeholder="Nombre de la propiedad"
            onChange={handleChange(setPropertyName)}
            className={inputStyle}
          />

          <input
            type="text"
            name="schedule"
            value={schedule}
            placeholder="Horario (por ejemplo: 18 - 20 - 22)"
            onChange={handleChange(setSchedule)}
            className={inputStyle}
          />

          <input
            type="text"
            name="field_type"
            value={fieldType}
            placeholder="Tipo de cancha (ej: 5 - 7 - 9)"
            onChange={handleChange(setFieldType)}
            className={inputStyle}
          />

          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange(setDate)}
            className={inputStyle}
          />

          <input
            type="number"
            name="missing_players"
            value={missingPlayers}
            placeholder="Jugadores faltantes"
            onChange={handleChange(setMissingPlayers)}
            className={inputStyle}
            min={1}
          />

          <Button1 type="submit">Crear partido</Button1>
        </form>
      </div>
    </div>
  );
};

export default PartidoForm;
