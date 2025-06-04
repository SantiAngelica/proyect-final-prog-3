import React, { useEffect, useState, useContext } from "react";
import UserItem from "./UserItem.jsx";
import { AuthenticationContext } from "../../services/auth.context.jsx";

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
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="user-container">
      {users.map((user) => (
        <div key={user.id}>
          <UserItem user={user} onUserDelete={onUserDelete}/>
        </div>
      ))}
    </div>
  );
}

export default ListaUsuarios;
