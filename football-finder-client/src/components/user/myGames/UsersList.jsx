import React, { useEffect, useState, useContext, use } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import { jwtDecode } from "jwt-decode";

import UserItem from "./UserItem.jsx";
import SearchInput from "../../searchInput/SearchInput.jsx";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    fetch("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        const filteredUsers = data.filter((user) => user.rol === "player" && user.id !== userId);

        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading users.");
        setLoading(false);
      });
  }, []);

  
  const handleChangeQuery = (query) => {
    setQuery(query);  
     if (!query) {
      setFilteredUsers(users);
      return;
    }
    const filteredUsers = users.filter((user) => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.zone.toLowerCase().includes(query.toLowerCase()) ||
      user.positions.some((pos) =>{
        return pos.position.toLowerCase().includes(query.toLowerCase())
      }) ||
      user.fieldsType.some((field) => {
        return field.field.toLowerCase().includes(query.toLowerCase())
      })
    );
   
    setFilteredUsers(filteredUsers);
  }



  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Loading users...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="w-full min-h-screen pt-20 pb-20 px-8 flex flex-col items-center bg-gradient-to-r from-black via-gray-900 to-black">
      <SearchInput query={query} setQuery={handleChangeQuery}  />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-15 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-full min-h-[200px] flex"
          >
            <UserItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
