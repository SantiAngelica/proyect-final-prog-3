import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { useNavigate } from "react-router-dom";
import RedButton from "../../styles/RedButton.jsx";

import PositionListForm from "./PositionsListForm.jsx";
import FieldListForm from "./FieldListForm.jsx";
import { CardContainer, TittleCard, inputStyle } from "../../styles/Cards.jsx";
import Button from "../../styles/Button.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

function UpdateForm() {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmUpdateModal, setShowConfirmUpdateModal] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);

  const { uid } = useParams();
  const { token } = useContext(AuthenticationContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
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
    setEmail("");
    setAge("");
    setZone("");
    setPositions([]);
    setFieldsType([]);
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/users/profile`, {
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
        setEmail(data.email);
        setAge(data.age);
        setZone(data.zone);
        setPositions(data.positions.map((pos) => pos.position));
        setFieldsType(data.fieldsType.map((field) => field.field));
        setLoading(false);
      });
  }, [token]);

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

    setPendingUpdate(updatedProfile);
    setShowConfirmUpdateModal(true);
  };
  const confirmUpdate = () => {
    if (!pendingUpdate) return;

    fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pendingUpdate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar el perfil");
        }
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
      .catch((err) => {
        errorToast(err.message);
      })
      .finally(() => {
        setShowConfirmUpdateModal(false);
        setPendingUpdate(null);
      });
  };


  return (
    <div className={ContainerStyle}>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Actualizar Perfil</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle}
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={inputStyle}
              placeholder="Edad"
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
            <PositionListForm
              positions={positions}
              onAddPosition={onAddPosition}
              onRemovePosition={onRemovePosition}
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
            <RedButton type="button" onClick={() => setShowConfirmModal(true)}>
              Borrar perfil
            </RedButton>
          </div>
        </form>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-gradient-to-r from-black via-gray-900 to-black  bg-opacity-100  flex items-center justify-center z-50">
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-auto">
            <h3 className="text-lg font-semibold mb-4">
              ¿Estás seguro de que querés borrar tu perfil?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Se eliminara todo tu historial. Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
              <RedButton
                onClick={() => {
                  fetch("http://localhost:8080/api/users/delete", {
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
                    navigate("/");
                  });
                  setShowConfirmModal(false);
                }}
              >
                Borrar
              </RedButton>
            </div>
          </div>
        </div>
      )}
      {showConfirmUpdateModal && (
        <div className="fixed inset-0 bg-gradient-to-r from-black via-gray-900 to-black bg-opacity-100 flex items-center justify-center z-50">
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-auto">
            <h3 className="text-lg font-semibold mb-4">
              ¿Confirmás la actualización del perfil?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Se guardarán los cambios realizados.
            </p>
            <div className="flex justify-center gap-4">
              <RedButton onClick={() => setShowConfirmUpdateModal(false)}>
                Cancelar
              </RedButton>
              <Button onClick={confirmUpdate}>Confirmar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateForm;
