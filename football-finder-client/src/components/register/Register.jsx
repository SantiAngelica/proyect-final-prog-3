import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";

const inputStyleBase =
  "text-xs text-gray-500 font-bold w-full py-3 mb-4 border-b-2 bg-transparent outline-none";
const errorInputStyle = "border-red-500"; // 🔄 Estilo adicional para error
const normalInputStyle = "border-gray-500 focus:border-blue-500"; // 🔄 Normal

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
  const [fields, setFields] = useState([]);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleZoneChange = (e) => setZone(e.target.value);
  const handlePositionsChange = (e) => setPositions(e.target.value.split(","));
  const handleFieldsChange = (e) => setFields(e.target.value.split(","));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: !validateString(name, 1, 50),
      email: !validateEmail(email),
      password: !validatePassword(password, 8, 20, true, true),
    };

    setErrors(newErrors);

    if (newErrors.name) {
      errorToast("Nombre inválido");
      return;
    }
    if (newErrors.email) {
      errorToast("Email inválido");
      return;
    }
    if (newErrors.password) {
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
        console.error("Error en registro:", data.message);
        throw new Error(data.message || "Error al registrar");
      }

      successToast("Registro exitoso, iniciá sesión.");
      navigate("/");
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
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
            onChange={handleNameChange}
            className={`${inputStyleBase} ${
              errors.name ? errorInputStyle : normalInputStyle
            }`}
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`${inputStyleBase} ${
              errors.email ? errorInputStyle : normalInputStyle
            }`}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            className={`${inputStyleBase} ${
              errors.password ? errorInputStyle : normalInputStyle
            }`}
          />

          <input
            type="number"
            placeholder="Edad"
            value={age}
            onChange={handleAgeChange}
            className={`${inputStyleBase} ${normalInputStyle}`}
          />
          <input
            type="text"
            placeholder="Zona"
            value={zone}
            onChange={handleZoneChange}
            className={`${inputStyleBase} ${normalInputStyle}`}
          />
          <input
            type="text"
            placeholder="Posiciones (ej: Arquero, Defensor)"
            value={positions}
            onChange={handlePositionsChange}
            className={`${inputStyleBase} ${normalInputStyle}`}
          />
          <input
            type="text"
            placeholder="Canchas preferidas (ej: 5, 11)"
            value={fields}
            onChange={handleFieldsChange}
            className={`${inputStyleBase} ${normalInputStyle}`}
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
