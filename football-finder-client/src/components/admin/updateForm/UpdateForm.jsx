import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { useNavigate } from "react-router-dom";
import RedButton from "../../styles/RedButton.jsx";
import FieldListForm from './FieldListForm.jsx';
import SchedulesListForm from "./SchedulesListForm.jsx";


import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import Button from "../../styles/Button.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

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

  const onAddPosition = (newSch) => {
    if (newSch && !schedules.includes(newSch)) {
      setSchedules([...schedules, newSch]);
    }
  };
  const onRemovePosition = (schToRemove) => {
    setSchedules(schedules.filter((s) => s !== schToRemove));
  };
  const onAddFields = (newField) => {
    if (newField) {
      setFieldsType([...fieldsType, newField]);
    }
  };
  const onRemoveField = (fieldToRemove) => {
    setFieldsType(fieldsType.filter((f) => f !== fieldToRemove));
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

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/properties/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al eliminar la propiedad");
          return;
        }
        successToast("Propiedad eliminada correctamente");
        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
        errorToast("Error al eliminar la propiedad");
      });
  }
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
              onAddSchedule={onAddPosition}
              onRemoveSchedule={onRemovePosition}
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
            <RedButton onClick={handleDelete}>Borrar propiedad</RedButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
