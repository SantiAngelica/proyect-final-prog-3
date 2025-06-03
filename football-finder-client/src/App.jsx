import React, { useState } from "react";
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
  const [isLogged, setIsLogged] = useState(
    () => !!localStorage.getItem("football-finder-token")
  );

  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route element={<MainLayout />}>
            <Route element={<Protected />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/superadmin/*" element={<SuperDashboard />} />
              <Route path="/user/*" element={<UserDashboard />} />
            </Route>
          </Route>
          <Route path="/home" element={<Home isLogged={isLogged} />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
