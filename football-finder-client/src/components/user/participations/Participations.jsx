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
      {applications.length === 0 && invitations.length === 0 ?
        <p className="text-white text-lg">No tienes postulaciones ni invitaciones</p>
        :
        <div className={CardContainer}>

          {applications.length > 0 && (
            <ul className="flex flex-col items-start justify-start w-full gap-6">
              <h2 className={TittleCard}>Postulaciones</h2>
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
          <div className="w-full max-w-4xl mt-8">
            {invitations.length > 0 && (
              <ul className="flex flex-col gap-6">
                <h1 className="text-xl font-bold text-white mb-4">Invitaciones</h1>
                {invitations.map((inv) => (
                  <li key={inv.id}>
                    <InvItem inv={inv} onAccept={handleInvitationAccepted} />
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      }
    </div>
  );s
}

export default Participations;
