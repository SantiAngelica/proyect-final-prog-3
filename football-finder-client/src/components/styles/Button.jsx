const Button = ({ children, onClick, type = "button", ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className="cursor-pointer bg-transparent hover:bg-blue-600 border-2 border-blue-500 hover:border-blue-700 text-blue-500 hover:text-white rounded-xl px-5 py-1 flex items-center justify-center gap-2 transition-all duration-300"
    >
      <span className="text-md text-start">{children}</span>
    </button>
  );
};

export default Button;
