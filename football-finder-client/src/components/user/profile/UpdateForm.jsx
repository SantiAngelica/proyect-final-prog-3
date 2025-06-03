import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthenticationContext } from '../../services/auth.context';
import { errorToast, successToast } from '../../toast/NotificationToast';

import PositionListForm from './PositionsListForm.jsx';
import FieldListForm from './FieldListForm.jsx';

function UpdateForm() {
  const { uid } = useParams();
  const { token } = useContext(AuthenticationContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [zone, setZone] = useState('');
  const [positions, setPositions] = useState([]);
  const [fieldsType, setFieldsType] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('No se encontró el token. Por favor inicia sesión.');
      setLoading(false);
      return;
    }
    setName('');
    setEmail('');
    setAge('');
    setZone('');
    setPositions([]);
    setFieldsType([]);
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/users/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (!res.ok) {
        errorToast('Error al obtener el perfil del usuario');
        setError('Error al obtener el perfil del usuario');
        setLoading(false);
      }
      return res.json();
    }).then(data => {
      setName(data.name);
      setEmail(data.email);
      setAge(data.age);
      setZone(data.zone);
      setPositions(data.positions.map(pos => pos.position));
      setFieldsType(data.fieldsType.map(field => field.field));
      setLoading(false);
    })
  }, [token]);

  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  const onAddPosition = (newPos) => {
    if (newPos && !positions.includes(newPos)) {
      setPositions([...positions, newPos]);
    }
  }
  const onRemovePosition = (posToRemove) => {
    setPositions(positions.filter((p) => p !== posToRemove));
  }
  const onAddFields = (newField) => {
    if (newField && !fieldsType.includes(newField)) {
      setFieldsType([...fieldsType, newField]);
    }
  }
  const onRemoveField = (fieldToRemove) => {
    setFieldsType(fieldsType.filter((f) => f !== fieldToRemove));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age || !zone || positions.length === 0 || fieldsType.length === 0) {
      errorToast('Por favor, completa todos los campos');
      return
    }
    const updatedProfile = {
      name,
      email,
      age: parseInt(age),
      zone,
      user_positions: positions,
      user_fields: fieldsType
    };

    fetch('http://localhost:8080/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedProfile)
    })
      .then(res => {
        if (!res.ok) {
          errorToast('Error al actualizar el perfil');
          return
        }
        return res.json();
      }).then(data => {
        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
        setZone(data.zone);
        successToast('Perfil actualizado correctamente');
      })
  }
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Actualizar Perfil</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Zona</label>
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Posiciones</label>
          <PositionListForm positions={positions}
            onAddPosition={onAddPosition}
            onRemovePosition={onRemovePosition} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Canchas</label>
          <FieldListForm fields={fieldsType}
            onAddFields={onAddFields}
            onRemoveField={onRemoveField}
          />
        </div>
        <button className='bg-blue-500 text-white rounded px-2 py-1'>Guardar cambios</button>
      </form>
    </div>
  )
}

export default UpdateForm