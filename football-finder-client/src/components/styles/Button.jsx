const Button = ({ children, onClick, type = "button", ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className="bg-transparent border-2 border-blue-500 rounded-xl px-4 hover:cursor-pointer text-white flex flex-row items-start text-start gap-2 py-1 relative group hover:border-blue-700 transition-all duration-300"
    >
      <span className="text-md text-start">{children}</span>
    </button>
  );
};

export default Button;
