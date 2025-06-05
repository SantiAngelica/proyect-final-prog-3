import React, { useEffect, useState, useContext } from "react";
import UserItem from "./UserItem.jsx";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import { CardContainer } from "../../styles/Cards.jsx";
import { TittleCard } from "../../styles/Cards.jsx";

function ListaUsuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
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
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading users.");
        setLoading(false);
      });
  }, []);

  const onUserDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (loading)
    return (
      <div className={ContainerStyle}>
        <p>Cargando Usuarios...</p>
      </div>
    );
  if (error)
    return (
      <div className={ContainerStyle}>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className={ContainerStyle}>
      {users.map((user) => (
        <div
          className="flex flex-col mb-6 items-start bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl p-6 w-1/2 mx-auto h-1/2"
          key={user.id}
        >
          <UserItem
            className={TittleCard}
            user={user}
            onUserDelete={onUserDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ListaUsuarios;
