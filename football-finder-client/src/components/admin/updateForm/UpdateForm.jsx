import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import RedButton from "../../styles/RedButton.jsx";
import FieldListForm from "./FieldListForm.jsx";
import SchedulesListForm from "./SchedulesListForm.jsx";

import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import Button from "../../styles/Button.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

import useConfirmModal from "../../../hooks/useConfirmModal";

function UpdateForm() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { token } = useContext(AuthenticationContext);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [zone, setZone] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [fieldsType, setFieldsType] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { Modal, show } = useConfirmModal();

  useEffect(() => {
    if (!token) {
      setError("No se encontró el token. Por favor inicia sesión.");
      setLoading(false);
      return;
    }
    setName("");
    setAdress("");
    setZone("");
    setSchedules([]);
    setFieldsType([]);
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/properties/my-property`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener el perfil del usuario");
          setError("Error al obtener el perfil del usuario");
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setAdress(data.adress);
        setZone(data.zone);
        setSchedules(data.schedules.map((sch) => sch.schedule));
        setFieldsType(data.fields.map((field) => field.field_type));
        setLoading(false);
      });
  }, [token]);

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando datos de la propiedad...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  const onAddSchedule = (newSch) => {

    if (newSch) {
      if(schedules.includes(newSch)){
        errorToast('Horario ya registrado')
        return false
      }
      setSchedules([...schedules, newSch]);

      return true
    }
  };
  const onRemoveSchedule = (schToRemove) => {
    setSchedules(schedules.filter((s, index) => index !== schToRemove));
 
  };
  const onAddFields = (newField) => {
    if (newField) {
      setFieldsType([...fieldsType, newField]);
    }
    console.log(fieldsType)
  };
  const onRemoveField = (fieldToRemove) => {
    console.log(fieldsType)
    setFieldsType(fieldsType.filter((f, index) => index !== fieldToRemove));
  };

  const updatePropertyRequest = () => {
    const updateProperty = {
      name,
      adress,
      zone,
      schedule: schedules,
      fields_type: fieldsType,
    };

    fetch(`http://localhost:8080/api/properties/update/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateProperty),
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al actualizar el perfil");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setAdress(data.adress);
        setZone(data.zone);
        successToast("Perfil actualizado correctamente");
        navigate("/admin");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !adress ||
      !zone ||
      schedules.length === 0 ||
      fieldsType.length === 0
    ) {
      errorToast("Por favor, completa todos los campos");
      return;
    }

    show({
      title: "Confirmar cambios",
      message: "¿Querés guardar los cambios realizados?",
      confirmText: "Guardar",
      cancelText: "Cancelar",
      onConfirm: updatePropertyRequest,
    });
  };

  const handleDeleteProperty = () => {
    if (!token) {
      errorToast("No token found, please Log in");
      return;
    }

    show({
      title: "¿Estás seguro de que querés borrar esta propiedad?",
      message: "Esta acción no se puede deshacer.",
      confirmText: "Borrar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/api/properties/${pid}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Error al borrar la propiedad");
          }
          successToast("Propiedad borrada correctamente");
          navigate("/admin");
        } catch (err) {
          errorToast(err.message || "Error al borrar la propiedad");
        }
      },
    });
  };

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Actualizar Propiedad</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle}
              placeholder="Nombre"
            />
          </div>
          <div>
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              className={inputStyle}
              placeholder="Adress"
            />
          </div>
          <div>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className={inputStyle}
              placeholder="Zona"
            />
          </div>
          <div>
            <SchedulesListForm
              schedules={schedules}
              onAddSchedule={onAddSchedule}
              onRemoveSchedule={onRemoveSchedule}
            />
          </div>
          <div>
            <FieldListForm
              fields={fieldsType}
              onAddFields={onAddFields}
              onRemoveField={onRemoveField}
            />
          </div>
          <Button type="submit">Guardar cambios</Button>
          <div className="mt-4">
            <RedButton onClick={handleDeleteProperty}>
              Borrar propiedad
            </RedButton>
          </div>
        </form>
      </div>

      <Modal />
    </div>
  );
}

export default UpdateForm;
