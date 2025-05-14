import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";

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

    fetch("http://localhost:5173/api/auths/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((token) => {
        localStorage.setItem("book-champions-token", token);
        successToast("Inicio de sesión exitoso.");
        setIsLogged(true);
        navigate("/libros");
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
    <div className="mt-5 mx-3 p-5 shadow-lg rounded-lg">
      <div className="p-5 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h5 className="text-xl font-semibold">
            Bienvenidos a Football Finder
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className={`w-full p-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              required
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">El email es requerido.</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className={`w-full p-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">El password es requerido.</p>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex justify-end w-full md:w-auto">
              <Button />
            </div>
          </div>
          <div className="text-center mt-4">
            <p>¿Aún no tienes una cuenta?</p>
            <button
              type="button"
              onClick={handleNavigateToRegister}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
