import React, { useState } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { errorToast, successToast } from "../../toast/NotificationToast.jsx"

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

const PartidoForm = () => {
  const [propertyName, setPropertyName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [date, setDate] = useState("");
  const [missingPlayers, setMissingPlayers] = useState("");

  const handleChange = (setter) => (e) => setter(e.target.value);

  const { token } = useContext(AuthenticationContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyName || !schedule || !fieldType || !missingPlayers || !date) {
      errorToast("Please fill in all fields");
      return;
    }

    const game = {
      property_name: propertyName,
      schedule,
      field_type: fieldType,
      date,
      missing_players: Number(missingPlayers),
    };


    try {
      const response = await fetch("http://localhost:8080/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(game),
      });

      if (response.ok) {
        successToast("Game created successfully");
        setPropertyName("");
        setSchedule("");
        setFieldType("");
        setDate("");
        setMissingPlayers("");
      } else {
        const err = await response.json();
        errorToast("Error creating game: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      errorToast("Connection error: " + error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "red", padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="property_name"
          value={propertyName}
          placeholder="Property Name"
          onChange={handleChange(setPropertyName)}
          className={inputStyle}
        />

        <input
          type="text"
          name="schedule"
          value={schedule}
          placeholder="Schedule (e.g. 18 - 20 - 22)"
          onChange={handleChange(setSchedule)}
          className={inputStyle}
        />

        <input
          type="text"
          name="field_type"
          value={fieldType}
          placeholder="Field Type (e.g. 5 - 7 - 9)"
          onChange={handleChange(setFieldType)}
          className={inputStyle}
        />

        <input
          type="date"
          name="date"
          value={date}
          onChange={handleChange(setDate)}
          className={inputStyle}
        />

        <input
          type="number"
          name="missing_players"
          value={missingPlayers}
          placeholder="Missing Players"
          onChange={handleChange(setMissingPlayers)}
          className={inputStyle}
          min={1}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Game
        </button>
      </form>
    </div>
  );
};

export default PartidoForm;
