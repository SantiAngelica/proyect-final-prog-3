
import React, { useContext, useState, useRef } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { useNavigate } from "react-router-dom";
import RedButton from "../../styles/RedButton.jsx";
import FieldListForm from './FieldListForm.jsx';
import SchedulesListForm from "./SchedulesListForm.jsx";
import { validarDireccion, validateString } from "../../auth/auth.services.js";


import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import Button from "../../styles/Button.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";


function CreateProperty({setHasProperty}) { 
  const navigate = useNavigate();

  const { token } = useContext(AuthenticationContext);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [zone, setZone] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [fieldsType, setFieldsType] = useState([]);
  const adressRef = useRef(null);
  const zoneRef = useRef(null);
  const nameRef = useRef(null);
  const [errors, setErrors] = useState({
    name: false,
    adress: false,
    zone: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !validateString(name, 5, 50),
      adress: !validarDireccion(adress),
      zone: !validateString(zone, 1, 50),
    };
    setErrors(newErrors);

    if (newErrors.name) {
      nameRef.current.focus();
      errorToast("Nombre de propiedad inválido");
      return;
    }
    if (newErrors.adress) {
      adressRef.current.focus();
      errorToast("Direccion inválida");
      return;
    }
    if (newErrors.zone) {
      zoneRef.current.focus();
      errorToast("Zona inválida");
      return;
    }
    const newproperty = {
      name,
      adress,
      zone,
      schedule: schedules,
      fields_type: fieldsType,
    }

    fetch('http://localhost:8080/api/properties/newproperty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newproperty),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            return res.json().then((data) => {
            throw new Error(data.message);
          });
          }
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        successToast("Propiedad creada exitosamente");
        setHasProperty(true);
        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
        errorToast(error.message || "Error al crear la propiedad");
        if (error.message === "Nombre de la propiedad ya tomado") {
          nameRef.current.focus();
        }})
  }
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
  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Crea tu Propiedad</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle}
              placeholder="Nombre"
              ref={nameRef}
            />
          </div>
          <div>
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              className={inputStyle}
              placeholder="Direccion"
              ref={adressRef}
            />
          </div>
          <div>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className={inputStyle}
              placeholder="Zona"
              ref={zoneRef}
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
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  );

}

export default CreateProperty