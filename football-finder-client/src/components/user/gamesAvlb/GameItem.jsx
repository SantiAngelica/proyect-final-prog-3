import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx";
import { TittleCard, inputStyle, colorStrong } from "../../styles/Cards.jsx";
import Button1 from "../../styles/Button1.jsx";

const GameItem = ({ game }) => {
  const { token } = useContext(AuthenticationContext);

  const handleApply = async () => {
    fetch(`http://localhost:8080/api/participations/application/${game.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((data) => {
              throw new Error(data.message || "Error al aplicar para el juego");
            });
          }
          throw new Error("Error al aplicar para el juego");
        }
        return response.json();
      })
      .then(() => {
        successToast("Postulación enviada correctamente");
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  return (
    <div className="flex flex-col items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-full max-w-2xl">
      <h2 className={TittleCard}>Partidos disponibles</h2>
      <ul className="flex flex-col w-full gap-3 ">
        <li className="border-2 border-gray-500 p-4 rounded-lg">
          <ul>
            <li className={inputStyle}>
              <strong className={colorStrong}>Creador: </strong>
              {game.userCreator.name}
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Predio: </strong>
              {game.reservation.fieldType.property.name}
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Fecha: </strong>
              {game.reservation.date}
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Hora: </strong>
              {game.reservation.schedule.schedule} hs
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Zona: </strong>
              {game.reservation.fieldType.property.zone}
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Dirección: </strong>
              {game.reservation.fieldType.property.adress}
            </li>
            <li className={inputStyle}>
              <strong className={colorStrong}>Cancha: </strong>
              {game.reservation.fieldType.field_type}
            </li>
            <Button1 onClick={handleApply}>Postularse</Button1>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default GameItem;
