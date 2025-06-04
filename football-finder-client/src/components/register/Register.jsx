import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button1 from "../styles/Button1";

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [positions, setPositions] = useState([]);
  const [fields, setFields] = useState([]);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

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
      nameRef.current.focus();
      errorToast("Nombre inválido");
      return;
    }
    if (newErrors.email) {
      emailRef.current.focus();
      errorToast("Email inválido");
      return;
    }
    if (newErrors.password) {
      passwordRef.current.focus();
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]  grayscale brightness-[0.3]"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md text-white">
          <h2 className="text-xl font-semibold mb-4">
            ¡Crea una cuenta en un minuto!
          </h2>

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
            className={inputStyle}
            ref={nameRef}
          />

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={inputStyle}
            ref={emailRef}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            className={inputStyle}
            ref={passwordRef}
          />
          <input
            type="text"
            placeholder="Edad"
            value={age}
            onChange={handleAgeChange}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Zona"
            value={zone}
            onChange={handleZoneChange}
            className={inputStyle}
          />
          <input
            type="text"
            placeholder="Posiciones (ej: Arquero, Defensor)"
            value={positions}
            onChange={handlePositionsChange}
            className={inputStyle}
          />
          <div className="flex justify-end">
            <Button1 type="submit">Registrarse</Button1>
          </div>

          <div className="text-white text-start pt-3 border-t border-gray-800 mt-6">
            <p className="text-xs font-light mb-3">¿Ya tienes una cuenta?</p>
            <Button1 onClick={handleNavigateToLogin}>Iniciar Sesión</Button1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
