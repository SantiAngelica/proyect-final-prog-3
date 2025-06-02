import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white py-3">
        <div className="text-center">
          <p className="mb-0 text-sm">
            {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
