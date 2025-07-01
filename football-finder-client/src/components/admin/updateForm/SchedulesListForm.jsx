import React, { useState } from "react";
import Button from "../../styles/Button";

function SchedulesListForm({ schedules, onAddSchedule, onRemoveSchedule }) {
  const [newSchedule, setNewSchedule] = useState("");

  const handleAdd = () => {
    const trimmed = newSchedule.trim();
    if (trimmed !== "") {
      const ok = onAddSchedule(parseInt(trimmed));
      if(ok) setNewSchedule("");
    }
  };
  

  const handleRemove = (pos) => {
    onRemoveSchedule(pos);
    console.log(schedules)
  };
  const inputStyle =
    "text-xs text-white font-bold py-3 w-1/2 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          value={newSchedule}
          onChange={(e) => setNewSchedule(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Nuevo horario"
          className={inputStyle}
        />
        <Button type="button" onClick={handleAdd}>
          Agregar
        </Button>
      </div>

      <ul className="min-h-[48px] flex flex-wrap gap-2 items-start">
        {schedules.map((schedule, index) => (
          <li key={index} className="text-xs">
            <button type="button"
              onClick={() => handleRemove(index)}
              className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 hover:cursor-pointer transition-colors"
            >
              {schedule} <span className="ml-1 font-bold">✕</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SchedulesListForm;