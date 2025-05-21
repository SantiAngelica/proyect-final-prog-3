import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3 mb-4 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
  const [fields, setFields] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateString(name, 1, 50)) {
      errorToast("Nombre inválido");
      return;
    }
    if (!validateEmail(email)) {
      errorToast("Email inválido");
      return;
    }
    if (!validatePassword(password, 8, 20, true, true)) {
      errorToast("Contraseña inválida");
      return;
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
      const res = await fetch("http://localhost:8080/api/auths/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Error en registro:", data.message); // Ver mensaje
        throw new Error(data.message || "Error al registrar");
      }

      successToast("Registro exitoso, iniciá sesión.");
      navigate("/");
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden md:block w-1/2">
        <img
          src="/img 3.avif"
          alt="Football"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md text-white">
          <h2 className="text-2xl font-bold mb-6">Registrarse</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyle}
          />
          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Zona"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Posiciones (ej: Arquero, Defensor)"
            value={positions}
            onChange={(e) => setPositions(e.target.value.split(","))}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Canchas preferidas (ej: 5, 11)"
            value={fields}
            onChange={(e) => setFields(e.target.value.split(","))}
            className={inputStyle}
          />
          <Button type="submit">Registrarse</Button>
          <div className="text-white text-start pt-3 border-t border-gray-800 mt-6">
            <p className="text-xs font-light mb-3">¿Ya tienes una cuenta?</p>
            <Button onClick={handleNavigateToLogin}>Iniciar Sesión</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
