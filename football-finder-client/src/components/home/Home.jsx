import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "../styles/Button";
import Button1 from "../styles/Button1";
import { AuthenticationContext } from "../services/auth.context";
import { isTokenValid } from "../services/auth/auth.helpers";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthenticationContext);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token && isTokenValid(token)) {
      setIsLogged(true);
      try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        setUsername(decoded.username || "Usuario");
      } catch (err) {
        console.error("Error decodificando token:", err);
      }
    } else {
      setIsLogged(false);
      setUsername("");
    }
  }, [token]);

  const handleNavigateToLogin = () => navigate("/login");
  const handleNavigateToRegister = () => navigate("/register");

  const handleStart = () => {
    if (token && isTokenValid(token)) {
      try {
        const { role } = jwtDecode(token);
        if (role === "superadmin") navigate("/superadmin");
        else if (role === "admin") navigate("/admin");
        else navigate("/user");
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10 grayscale brightness-[0.3]"
      >
        <source src="/video-fondo.mp4" type="video/mp4" />
      </video>

      <nav className="h-[80px] w-full flex items-center justify-between px-12 z-10">
        <div className="flex flex-row">
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            Football
          </p>
          <p className="text-xl">Finder</p>
        </div>

        <div className="flex flex-row gap-6 items-center">
          {isLogged ? (
            <p className="text-sm text-gray-200">
              ¡Hola, <span className="font-semibold">{username}</span>!
            </p>
          ) : (
            <>
              <Button onClick={handleNavigateToLogin}>Iniciar Sesión</Button>
              <Button1 onClick={handleNavigateToRegister}>Registrarse</Button1>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-6 flex-grow z-10 max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-4">
          Jugá{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            donde
          </span>{" "}
          y{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            cuando
          </span>{" "}
          quieras.
        </h1>
        <h2 className="text-4xl font-semibold mb-6">Tu partido en un click.</h2>
        <p className="text-md text-gray-300 mb-8">
          Encontrá partidos cerca de tu ubicación, organizá tu propio encuentro
          o sumate a uno existente. Conectá con jugadores como vos, reservá
          canchas y viví el fútbol de manera simple, rápida y desde cualquier
          dispositivo.
        </p>
        <Button1 onClick={handleStart}>Comenzar</Button1>
      </div>
    </div>
  );
};

export default Home;
