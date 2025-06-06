import { useState } from "react";
import ConfirmModal from "../components/modal/ConfirmModal.jsx";

export default function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    onConfirm: () => {},
  });

  const show = ({ title, message, confirmText, cancelText, onConfirm }) => {
    setModalOptions({
      title,
      message,
      confirmText: confirmText || "Confirmar",
      cancelText: cancelText || "Cancelar",
      onConfirm,
    });
    setIsOpen(true);
  };

  const Modal = () => (
    <ConfirmModal
      isOpen={isOpen}
      title={modalOptions.title}
      message={modalOptions.message}
      confirmText={modalOptions.confirmText}
      cancelText={modalOptions.cancelText}
      onCancel={() => setIsOpen(false)}
      onConfirm={() => {
        modalOptions.onConfirm();
        setIsOpen(false);
      }}
    />
  );

  return { show, Modal };
}
