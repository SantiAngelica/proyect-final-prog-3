import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast, successToast } from "../../toast/NotificationToast";
import { inputStyle } from "../../styles/Cards";
import Button1 from "../../styles/Button1";
import ConfirmModal from "../../Modal/ConfirmModal";

function AppItem({ application, onAcceptApplication }) {
  const { token } = useContext(AuthenticationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptApp = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/participations/acepted-application/${application.id}`,
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
          throw new Error(data.message || "Error al aplicar para el juego");
        }
        throw new Error("Error al aceptar la solicitud");
      }

      const data = await res.json();
      if (data) {
        successToast("Solicitud aceptada correctamente");
        onAcceptApplication(application.id, application.userApplicant);
      }
    } catch (err) {
      errorToast(err.message);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-start w-full">
      <li key={application.id} className={inputStyle}>
        {application.userApplicant.name} ({application.userApplicant.email})
      </li>

      <Button1 onClick={openModal}>Aceptar</Button1>

      <ConfirmModal
        isOpen={isModalOpen}
        title="¿Aceptar solicitud?"
        message={`¿Estás seguro de que querés aceptar a ${application.userApplicant.name}?`}
        onConfirm={handleAcceptApp}
        onCancel={closeModal}
        confirmText="Aceptar"
        cancelText="Cancelar"
      />
    </div>
  );
}

export default AppItem;
