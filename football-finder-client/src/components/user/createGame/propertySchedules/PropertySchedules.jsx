import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inputStyle, TittleCard } from "../../../styles/Cards.jsx";
import { ContainerStyle } from "../../../styles/Container.jsx";
import { isInAWeek } from "../../../utils/validations.js";
import { errorToast, successToast } from "../../../toast/NotificationToast.jsx";

import Button from "../../../styles/Button.jsx";
import { AuthenticationContext } from "../../../services/auth.context.jsx";
import { RxCross1 } from "react-icons/rx";
import useConfirmModal from "../../../../hooks/useConfirmModal";

function PropertySchedules() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthenticationContext);
  const { show, Modal } = useConfirmModal();

  const [fieldSchedules, setFieldSchedules] = useState([]);
  const [selected, setSelected] = useState({ id_field: 0, id_sch: 0 });
  const [date, setDate] = useState("");
  const [missingPlayers, setMissingPlayers] = useState(5);

  const getFieldsSchedules = (actualDate) => {
    fetch(
      `http://localhost:8080/api/properties/property-schedules?date=${actualDate}&pid=${pid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok)
          throw new Error("Error al obtener los horarios de la cancha");
        return res.json();
      })
      .then((data) => setFieldSchedules(data))
      .catch((err) =>
        errorToast(err.message || "Error al obtener los horarios")
      );
  };

  const handleChangeDate = (e) => {
    const newDate = e.target.value;
    if (!isInAWeek(newDate)) {
      errorToast("La fecha debe ser dentro de una semana");
    } else {
      setDate(newDate);
      getFieldsSchedules(newDate);
      // Reset selected on date change:
      setSelected({ id_field: 0, id_sch: 0 });
    }
  };

  const createGame = (mp) => {
    fetch("http://localhost:8080/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        property_id: Number(pid),
        schedule: selected.id_sch,
        field_type: selected.id_field,
        date,
        missing_players: mp,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Error al crear el juego");
          });
        }
        return res.json();
      })
      .then(() => {
        successToast("Juego creado correctamente");
        navigate("/user/my-games", { replace: true });
      })
      .catch((err) => errorToast(err.message));
  };

  const handleClickReserve = () => {
    if (missingPlayers <= 0 || missingPlayers > 10) {
      return errorToast("Ingresá un número válido (1-10)");
    }

    show({
      title: "¿Deseás crear este juego?",
      message: `Se reservará el horario seleccionado y se indicará que faltan ${missingPlayers} jugadores.`,
      confirmText: "Crear juego",
      cancelText: "Cancelar",
      onConfirm: () => createGame(missingPlayers),
    });
  };

  return (
    <div className={ContainerStyle}>
      <Modal />
      <div className="flex flex-col items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2 mt-15">
        <h1 className={TittleCard}>Seleccione una fecha</h1>
        <input
          type="date"
          className={inputStyle}
          value={date}
          onChange={handleChangeDate}
        />

        {date && (
          <div>
            <h2 className="text-md font-semibold mt-4 mb-4">
              Seleccione un horario disponible
            </h2>
            {fieldSchedules.map((field) => (
              <div key={field.id} className="mb-8">
                <span className="text-sm font-semibold text-white bg-gray-700 px-3 py-1 rounded-md">
                  {field.field_type}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <ul className="flex flex-wrap items-center gap-2">
                    {field.schedule.map((sch) => {
                      const isSelected =
                        Number(sch.id) === Number(selected.id_sch) &&
                        Number(field.id) === Number(selected.id_field);

                      const baseClasses =
                        "relative list-none px-4 py-3 text-xs font-semibold rounded border-2 transition-all ";

                      const availabilityClasses = sch.available
                        ? "cursor-pointer border-gray-300  hover:border-blue-600"
                        : "opacity-50 cursor-not-allowed pointer-events-none border-blue-600";

                      const selectedClasses = isSelected
                        ? "border-lime-400 hover:border-lime-400"
                        : "";

                      return (
                        <li
                          key={sch.id}
                          className={`${baseClasses} ${availabilityClasses} ${selectedClasses}`}
                          onClick={() => {
                            if (sch.available) {
                              setSelected({
                                id_field: Number(field.id),
                                id_sch: Number(sch.id),
                              });
                            }
                          }}
                        >
                          {sch.schedule}
                          {!sch.available && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-300">
                              <RxCross1 />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}

            {selected.id_field > 0 && selected.id_sch > 0 && (
              <div className="my-4">
                <label
                  htmlFor="missingPlayers"
                  className="block text-sm font-semibold text-white mb-2 mt-8"
                >
                  Jugadores faltantes:
                </label>
                <input
                  id="missingPlayers"
                  type="number"
                  min="1"
                  max="10"
                  value={missingPlayers}
                  onChange={(e) => setMissingPlayers(Number(e.target.value))}
                  className={inputStyle}
                />
              </div>
            )}

            {selected.id_field > 0 && selected.id_sch > 0 ? (
              <Button onClick={handleClickReserve}>Reservar</Button>
            ) : (
              <Button className="opacity-50 cursor-not-allowed">
                Reservar
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertySchedules;
