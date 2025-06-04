import React, { useState } from "react";
import Button from "../../styles/Button";

function FieldListForm({ fields, onAddFields, onRemoveField }) {
  const [newField, setNewField] = useState("");

  const handleAdd = () => {
    const trimmed = newField.trim();
    if (trimmed !== "") {
      onAddFields(trimmed);
      setNewField("");
    }
  };

  const handleRemove = (field) => {
    onRemoveField(field);
  };

  const inputStyle =
    "text-xs text-white font-bold w-1/2 py-3 mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Nueva cancha"
          className={inputStyle}
        />
        <Button type="button" onClick={handleAdd}>
          Agregar
        </Button>
      </div>

      <ul className="min-h-[48px] flex flex-wrap gap-2 items-start">
        {fields.map((field, index) => (
          <li key={index} className="text-xs">
            <button
              onClick={() => handleRemove(field)}
              className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 hover:cursor-pointer transition-colors"
            >
              {field} <span className="ml-1 font-bold">✕</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldListForm;
