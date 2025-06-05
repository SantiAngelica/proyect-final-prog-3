import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context";
import { errorToast } from "../../toast/NotificationToast";
import InvItem from "./InvItem.jsx";
import AppItem from "./AppItem.jsx";
import { CardContainer, TittleCard } from "../../styles/Cards.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";

function Participations() {
  const { token } = useContext(AuthenticationContext);
  const [applications, setApplications] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loadingApp, setLoadingApp] = useState(true);
  const [loadingInv, setLoadingInv] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/participations/my-applications", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener las postulaciones");
          return;
        }
        return res.json();
      })
      .then((data) => {
        const filteredApplications = data.filter(
          (app) => app.state == "pendiente"
        );
        setApplications(filteredApplications);
        setLoadingApp(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingApp(false);
      });
    fetch("http://localhost:8080/api/participations/my-invitations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          errorToast("Error al obtener las invitaciones");
          return;
        }
        return res.json();
      })
      .then((data) => {
        const filteredInvitations = data.filter(
          (inv) => inv.state == "pendiente"
        );
        setInvitations(filteredInvitations);
        setLoadingInv(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingInv(false);
      });
  }, []);

  const handleInvitationAccepted = (id) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  if (loadingApp || loadingInv)
    return (
      <div className={ContainerStyle}>
        <p>Cargando participaciones del usuario...</p>
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
      <div className="flex flex-col mb-6 items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2">
        <h2 className={TittleCard}>Invitaciones</h2>
        {invitations.length > 0 && (
          <ul className="flex flex-col w-full">
            {invitations.map((inv) => (
              <li
                className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
                key={inv.id}
              >
                <InvItem inv={inv} onAccept={handleInvitationAccepted} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={CardContainer}>
        <h2 className={TittleCard}>Postulaciones</h2>
        {applications.length > 0 && (
          <ul className="flex flex-col items-start justify-start w-full gap-6">
            {applications.map((app) => (
              <li
                key={app.id}
                className="flex flex-col items-start justify-start w-full border-2 border-gray-500 p-4 rounded-lg"
              >
                <AppItem app={app} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Participations;
