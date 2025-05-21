import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      errorToast("Email invalido");
      return;
    } else {
      setErrors({ ...errors, email: false });
    }

    if (!validatePassword(password, 1)) {
      setErrors({ ...errors, password: true });
      errorToast("La contraseña es requerida");
      passwordRef.current.focus();
      return;
    } else {
      setErrors({ ...errors, password: false });
    }

    fetch("http://localhost:8080/api/auths/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((token) => {
        localStorage.setItem("football-finder-token", token);
        successToast("Inicio de sesión exitoso.");
        setIsLogged(true);
        navigate("/register");
      })
      .catch((err) => {
        errorToast("Error al iniciar sesión.");
        return;
      });
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
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
          <h1 className="text-white text-2xl font-bold text-start mb-6">
            Bienvenidos a<br />
            <span className="text-5xl bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
              Football Finder
            </span>
          </h1>

          <h2 className="text-white text-md font-bold text-start mb-3">
            Iniciar sesión
          </h2>

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
              <Button type="submit">Iniciar</Button>
            </div>
          </form>
          <div className="text-white text-start pt-3 border-t border-gray-800 mt-6">
            <p className="text-xs font-light mb-3">
              ¿Aún no tienes una cuenta?
            </p>
            <Button type="button" onClick={handleNavigateToRegister}>
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
