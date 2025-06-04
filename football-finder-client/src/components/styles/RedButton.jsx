const RedButton = ({ children, onClick, type = "button", ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className="cursor-pointer bg-red-600 hover:bg-red-700 border-2 border-red-600 hover:border-red-800 text-white rounded-xl px-5 py-1 flex items-center justify-center gap-2 transition-all duration-300"
    >
      <span className="text-md text-start">{children}</span>
    </button>
  );
};

export default RedButton;
