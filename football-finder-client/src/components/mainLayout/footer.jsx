import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-light py-3 mt-5">
        <div className="text-center">
          <p className="mb-0">
            {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
