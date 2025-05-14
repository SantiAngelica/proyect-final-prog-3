import { Send } from "lucide-react";

const Button = () => {
  return (
    <button className="bg-transparent text-white flex items-center gap-2 px-4 py-2 relative group">
      <span className="text-lg">Iniciar</span>
      <Send size={22} strokeWidth={1.75} className="text-blue-500" />
      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 group-hover:h-0.5 transition-all duration-300"></span>
    </button>
  );
};

export default Button;
