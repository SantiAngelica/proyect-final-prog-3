import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";
import Button1 from "../styles/Button1";
import { jwtDecode } from "jwt-decode";

const inputStyle =
  "text-xs text-gray-500 font-bold w-full py-3  mb-6 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

const Login = ({ setIsLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      errorToast("Email inválido");
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ ...errors, password: true });
      passwordRef.current.focus();
      errorToast(
        "La contraseña es inválida. Debe tener al menos 8 caracteres, una mayúscula y un número."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auths/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const token = await res.json();

      if (!res.ok) {
        errorToast(token.message || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("football-finder-token", token);

      const decoded = jwtDecode(token); // Se decodifica el token
      const userRole = decoded.role;

      successToast("Inicio de sesión exitoso.");


      // Redirección según rol
      console.log(userRole);
      if (userRole === "superadmin") navigate("/superadmin");
      else if (userRole === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      errorToast("Error al conectar con el servidor.");
    }
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
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
          <source src="/video 1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <div className="w-full h-auto flex flex-col  max-w-md">
          <h1 className="text-white text-md font-bold text-start">
            <p className="mb-2"> Bienvenidos a</p>
            <span className="text-5xl  flex flex-row mb-4">
              <p className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
                Football
              </p>
              <p className="font-normal text-white">Finder</p>
            </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Ingresar email"
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                className={inputStyle}
              />

              <input
                type="password"
                name="password"
                placeholder="Ingresar contraseña"
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                className={inputStyle}
              />
            </div>

            <div className="flex justify-end">
              <Button1 type="submit">Iniciar Sesión</Button1>
            </div>
          </form>
          <div className="text-white text-start pt-3 border-t border-gray-800 mt-6">
            <p className="text-xs font-light mb-3">
              ¿Aún no tienes una cuenta?
            </p>
            <Button1 type="button" onClick={handleNavigateToRegister}>
              Registrarse
            </Button1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
