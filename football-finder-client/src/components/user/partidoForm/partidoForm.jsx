import React, { useState } from 'react';

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

const PartidoForm = () => {
  const [property_name, setPropertyName] = useState("");
  const [date, setDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [field_type, setFieldType] = useState("");

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleScheduleChange = (event) => {
    setSchedule(event.target.value);
  };

  const handleFieldTypeChange = (event) => {
    setFieldType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const game = {
      property_name,
      date,
      schedule,
      field_type
    };

    try {
      const response = await fetch('http://localhost:8080/api/partidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      });

      if (response.ok) {
        alert("Game saved successfully");
      } else {
        alert("Error saving the game");
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Connection error');
    }
  };

  return (
    <div className='background-color:red'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="property_name"
            value={property_name}
            placeholder="Enter the property's name"
            onChange={handlePropertyNameChange}
            className={inputStyle}
          />

          <input
            type="text"
            name="date"
            value={date}
            onChange={handleDateChange}
            placeholder="Enter the game date (dd/mm/yy)"
            className={inputStyle}
          />

          <input
            type="text"
            name="schedule"
            value={schedule}
            onChange={handleScheduleChange}
            placeholder="Enter the game schedule"
            className={inputStyle}
          />

          <input
            type="text"
            name="field_type"
            value={field_type}
            onChange={handleFieldTypeChange}
            placeholder="Enter the field type"
            className={inputStyle}
          />
        </div>
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};

export default PartidoForm;
