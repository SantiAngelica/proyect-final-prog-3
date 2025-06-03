import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';

function FieldListForm({ fields, onAddFields, onRemoveField }) {
    const [newField, setNewField] = useState('');

    const handleAdd = () => {
        const trimmed = newField.trim();
        if (trimmed !== '') {
            onAddFields(trimmed);
            setNewField('');
        }
    };

    const handleRemove = (pos) => {
        onRemoveField(pos);
    };
    return (
        <StyledWrapper>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                    placeholder="Nueva cancha"
                    className="border rounded px-2 py-1"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-blue-500 text-white rounded px-2 py-1"
                >
                    Agregar
                </button>
            </div>
            <ul className="list-size">
                {fields.map((field, index) => (
                    <li key={index} className="item-list">
                        <button className="item-list-button" onClick={() => handleRemove(field)}>{field}</button>
                    </li>
                ))}

            </ul>
        </StyledWrapper>
    );

}
const StyledWrapper = styled.div`

.list-size {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    margin-top: 0.25rem;
  }

  .list-size .item-list {
    list-style: none;
  }

  .list-size .item-list-button {
    cursor: pointer;

    padding: 0.5rem;
    background-color: var(--zinc-800);

    font-size: 0.75rem;
    color: var(--light);

    border: 2px solid var(--zinc-800);
    border-radius: 0.25rem;

    transition: all 0.3s ease-in-out;
  }

  .item-list-button:hover {
    border: 2px solid red
  }
`

export default FieldListForm