const Button1 = ({ children, onClick, type = "button", ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className=" cursor-pointer bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 hover:border-blue-800 text-white rounded-xl px-5 py-1 flex items-center justify-center gap-2 transition-all duration-300"
    >
      <span className="text-md text-start">{children}</span>
    </button>
  );
};

export default Button1;
