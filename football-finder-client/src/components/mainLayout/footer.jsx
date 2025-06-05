import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full h-[1px] bg-gradient-to-r from-black via-gray-600 to-black"></div>
      <footer className="w-full pt-24 pb-24 px-4 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-row w-full justify-center items-center mb-4">
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
              Football
            </p>
            <p className="text-4xl">Finder</p>
          </div>
          <p className="text-gray-400 text-sm select-none">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
