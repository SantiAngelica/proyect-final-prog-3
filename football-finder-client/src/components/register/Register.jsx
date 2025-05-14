import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../auth/auth.services";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
  });
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
  const [fields, setFields] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateString(name, 1, 50)) {
      setErrors({ ...errors, name: true });
      errorToast("El nombre es requerido y debe tener entre 1 y 50 caracteres");
      return;
    } else {
      setErrors({ ...errors, name: false });
    }

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: true });
      errorToast("El email es invalido");
      return;
    } else {
      setErrors({ ...errors, email: false });
    }

    if (!validatePassword(password, 8, 20, true, true)) {
      setErrors({ ...errors, password: true });
      errorToast(
        "La contraseña debe tener entre 8 y 20 caracteres, al menos una mayuscula y 1 numero"
      );
      return;
    } else {
      setErrors({ ...errors, password: false });
    }

    const newUser = {
      name,
      email,
      password,
      age: Number(age),
      zone,
      positions,
      fields,
    };

    try {
      const res = await fetch("http://localhost:5173/api/auths/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        errorToast("Error al registrar usuario.");
      }

      const userId = await res.json();

      successToast(
        "Usuario registrado exitosamente. Inicie sesión para continuar."
      );
      navigate("/login");
    } catch (err) {
      errorToast("Error al registar usuario.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        ¡Bienvenidos a Books Champion!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            required
            placeholder="Ingresar nombre de usuario"
            onChange={handleNameChange}
            value={name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="email"
            required
            placeholder="Ingresar email"
            onChange={handleEmailChange}
            value={email}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">El email es requerido.</p>
          )}
        </div>

        <div>
          <input
            type="number"
            required
            placeholder="Edad"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            required
            placeholder="Zona"
            onChange={(e) => setZone(e.target.value)}
            value={zone}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Posiciones (separadas por coma)"
            onChange={(e) =>
              setPositions(e.target.value.split(",").map((p) => p.trim()))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Campos (separados por coma)"
            onChange={(e) =>
              setFields(e.target.value.split(",").map((f) => f.trim()))
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Ingresar contraseña"
            onChange={handlePasswordChange}
            value={password}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              El password es requerido.
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
