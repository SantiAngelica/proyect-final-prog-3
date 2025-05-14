import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../auth/auth.services";
import { errorToast, successToast } from "../toast/NotificationToast";
import Button from "../styles/Button";

const inputStyle =
  "text-sm w-full py-2 border-b-2 border-gray-500 focus:border-blue-500 bg-transparent outline-none appearance-none rounded-none";

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
    <div className="flex h-screen w-screen">
      {/* Imagen */}
      <div className="hidden md:block w-1/2">
        <img
          src="/img 3.avif"
          alt="Football"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Formulario */}
      <div className="w-full md:w-1/2 bg-black flex items-center justify-center">
        <div className="w-full h-auto flex flex-col max-w-md">
          <h1 className="text-white text-3xl font-bold text-center">
            Bienvenidos a <span className="text-blue-500">Football Finder</span>
          </h1>

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
            </div>

            <div className="flex justify-end">
              <Button />
            </div>

            <div className="text-white text-center pt-6 border-t border-gray-700 mt-6">
              <p className="mb-3">¿Aún no tienes una cuenta?</p>
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
    </div>
  );
};
export default Login;
