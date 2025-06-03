import Button from "../styles/Button";
import Button1 from "../styles/Button1";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10 blur-sm grayscale brightness-[0.3]"
      >
        <source src="/video-fondo.mp4" type="video/mp4" />
      </video>

      <nav className="h-[80px] w-full flex items-center justify-between px-12 z-10">
        <div className="flex flex-row">
          <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            Football
          </p>
          <p className="text-xl ">Finder</p>
        </div>
        <div className="flex flex-row gap-6">
          <Button onClick={handleNavigateToLogin}>Iniciar Sesión</Button>
          <Button1 onClick={handleNavigateToRegister}>Registrarse</Button1>
        </div>
      </nav>

      {/* Contenido central */}
      <div className="flex flex-col items-center justify-center text-center px-6 flex-grow z-10 max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-6">
          Jugá{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            donde
          </span>{" "}
          y{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
            cuando
          </span>{" "}
          quieras. El fútbol está a un click.
        </h1>
        <p className="text-md text-gray-300 mb-8">
          Encontrá partidos cerca de tu ubicación, organizá tu propio encuentro
          o sumate a uno existente. Conectá con jugadores como vos, reservá
          canchas y viví el fútbol de manera simple, rápida y desde cualquier
          dispositivo.
        </p>
        <Button1 onClick={handleNavigateToLogin}>Comenzar</Button1>
      </div>
    </div>
  );
};

export default Home;
