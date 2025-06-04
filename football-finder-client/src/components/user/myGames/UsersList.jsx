import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth.context.jsx";
import { ContainerStyle } from "../../styles/Container.jsx";
import { CardContainer } from "../../styles/Cards.jsx";

import UserItem from "./UserItem.jsx";

function UsersList() {
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
    <div className="w-full min-h-screen pt-32 pb-20 px-8 flex justify-center bg-gradient-to-r from-black via-gray-900 to-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {users.map((user) => (
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
