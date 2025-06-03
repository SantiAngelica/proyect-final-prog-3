import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MainLayout from "./components/mainLayout/MainLayout";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import Protected from "./components/protected/Protected";

import NotFound from "./components/notFound/NotFound";

import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import SuperDashboard from "./components/superAdmin/dashboard/SuperDashboard";
import UserDashboard from "./components/user/dashboard/UserDashboard";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const onStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<MainLayout />}>
            <Route element={<Protected />}>
              <Route
                path="/admin/*"
                element={
                  <AdminDashboard
                    username={username}
                    setUsername={setUsername}
                  />
                }
              />
              <Route
                path="/superadmin/*"
                element={
                  <SuperDashboard
                    username={username}
                    setUsername={setUsername}
                  />
                }
              />
              <Route
                path="/user/*"
                element={
                  <UserDashboard
                    username={username}
                    setUsername={setUsername}
                  />
                }
              />
            </Route>
          </Route>
          <Route
            path="/home"
            element={<Home username={username} setUsername={setUsername} />}
          />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
