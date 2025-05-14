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
    <div className="flex h-screen w-screen">
      <div className="hidden md:block w-1/2">
        <img
          src="/img 3.avif"
          alt="Football"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <div className="w-full h-auto flex flex-col  max-w-md">
          <h2 className="text-white text-md font-bold text-start mb-3">
            Registrarte
          </h2>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}

              <input
                type="password"
                name="password"
                placeholder="Ingresar contraseña"
                className={inputStyle}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  El password es requerido.
                </p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}

              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El email es requerido.</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button>Iniciar</Button>
            </div>

            <div className="text-white text-start pt-3 border-t border-gray-800 mt-6">
              <p className="text-xs font-light mb-3">
                ¿Aún no tienes una cuenta?
              </p>
              <Button onClick={handleNavigateToRegister}>Registrarse</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
