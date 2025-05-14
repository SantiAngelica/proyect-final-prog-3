import { Send } from "lucide-react";

const Button = () => {
  return (
    <button className="bg-transparent border-b-2 border-blue-500 text-white flex items-center gap-2 px-4 py-2 relative group">
      <span className="text-lg">Iniciar</span>
      <Send size={22} strokeWidth={1.75} className="text-blue-500" />
    </button>
  );
};

export default Button;
