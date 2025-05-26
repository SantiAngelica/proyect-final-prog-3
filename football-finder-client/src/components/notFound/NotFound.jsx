import React from "react";
import { useNavigate } from "react-router";
import Button from "../styles/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div>Uppppps! La página que buscas no existe!</div>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </div>
  );
};

export default NotFound;
