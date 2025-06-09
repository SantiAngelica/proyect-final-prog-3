import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import useConfirmModal from "../../../hooks/useConfirmModal";

import PositionListForm from "./PositionsListForm.jsx";
import FieldListForm from "./FieldListForm.jsx";

import RedButton from "../../styles/RedButton.jsx";
import Button from "../../styles/Button.jsx";
import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

function UpdateForm() {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { token, handleUserLogout } = useContext(AuthenticationContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
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

    setLoading(true);
    fetch(`http://localhost:8080/api/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setZone(data.zone);
        setPositions(data.positions.map((pos) => pos.position));
        setFieldsType(data.fieldsType.map((field) => field.field));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const onAddPosition = (newPos) => {
    if (newPos && !positions.includes(newPos)) {
      setPositions([...positions, newPos]);
    }
  };

  const onRemovePosition = (posToRemove) => {
    setPositions(positions.filter((p) => p !== posToRemove));
  };

  const onAddFields = (newField) => {
    if (newField && !fieldsType.includes(newField)) {
      setFieldsType([...fieldsType, newField]);
    }
  };

  const onRemoveField = (fieldToRemove) => {
    setFieldsType(fieldsType.filter((f) => f !== fieldToRemove));
  };
  const confirmUpdate = (updatedProfile) => {
   
    if (!updatedProfile) return;
    fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar el perfil");
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setZone(data.zone);
        successToast("Perfil actualizado correctamente");
        navigate("/user/profile");
      })
      .catch((err) => errorToast(err.message))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !age ||
      !zone ||
      positions.length === 0 ||
      fieldsType.length === 0
    ) {
      errorToast("Por favor, completa todos los campos");
      return;
    }

    const updatedProfile = {
      name,
      email,
      age: parseInt(age),
      zone,
      user_positions: positions,
      user_fields: fieldsType,
    };

  
  


    show({
      title: "¿Confirmás la actualización del perfil?",
      message: "Se guardarán los cambios realizados.",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: () => {
        confirmUpdate(updatedProfile);
      },
    });
  };



  const confirmDelete = () => {
    fetch(`http://localhost:8080/api/users/delete/${uid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        errorToast("Error al borrar el perfil");
        return;
      }
      successToast("Perfil borrado correctamente");
      handleUserLogout()
      navigate("/");
    });
  };

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Actualizar Perfil</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            placeholder="Nombre completo"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
            placeholder="Email"
          />
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputStyle}
            placeholder="Edad"
          />
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className={inputStyle}
            placeholder="Zona"
          />

          <PositionListForm
            positions={positions}
            onAddPosition={onAddPosition}
            onRemovePosition={onRemovePosition}
          />
          <FieldListForm
            fields={fieldsType}
            onAddFields={onAddFields}
            onRemoveField={onRemoveField}
          />

          <Button type="submit">Guardar cambios</Button>
          <div className="mt-4">
            <RedButton
              type="button"
              onClick={() =>
                show({
                  title: "¿Estás seguro de que querés borrar tu perfil?",
                  message:
                    "Se eliminará todo tu historial. Esta acción no se puede deshacer.",
                  confirmText: "Borrar",
                  cancelText: "Cancelar",
                  onConfirm: () => confirmDelete(),
                })
              }
            >
              Borrar perfil
            </RedButton>
          </div>
        </form>
      </div>

      <Modal />
    </div>
  );
}

export default UpdateForm;
