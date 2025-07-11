import React from "react";

const SearchInput = ({ query, setQuery }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative flex items-center w-1/3 mx-auto">
      <svg
        viewBox="0 0 22 22"
        aria-hidden="true"
        className="absolute left-4 w-4 h-4 fill-[#bdbecb] pointer-events-none z-10"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </g>
      </svg>
      <input
        type="search"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        className="text-xs text-white font-bold w-full  h-[40px] pl-10 pr-3 rounded-xl border-0 outline-none bg-[#16171d] placeholder-gray-500 shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_black] transition-all duration-300 ease-out hover:shadow-[0_0_0_2.5px_#2f303d,0_0_25px_-15px_black] focus:shadow-[0_0_0_2.5px_#2f303d] font-montserrat"
      />
    </div>
  );
};

export default SearchInput;
