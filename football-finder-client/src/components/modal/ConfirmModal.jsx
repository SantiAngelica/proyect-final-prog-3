import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../styles/Button";
import RedButton from "../styles/RedButton";
import { AiOutlineClose } from "react-icons/ai";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative flex flex-col items-center bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-xl py-24 px-12 w-11/12 max-w-xl  mx-auto">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition cursor-pointer"
          aria-label="Cerrar"
        >
          <AiOutlineClose size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-6 text-white text-center">
          {title}
        </h3>
        <p className="text-sm text-gray-300 mb-8 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <RedButton onClick={onCancel}>{cancelText}</RedButton>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
