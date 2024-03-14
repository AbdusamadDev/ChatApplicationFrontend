import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Stack } from '@mui/material';
import SideBar from "./SideBar";
import axios from "axios";

const DashboardLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/auth/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          // Request successful, user is authenticated
          setIsLoggedIn(true);
        })
        .catch(error => {
          // Request failed, redirect to login page
          navigate('/auth/login');
        });
    } else {
      // Token doesn't exist, redirect to login page
      navigate('/auth/login');
    }
  }, [navigate]);

  // Render DashboardLayout if user is logged in
  return isLoggedIn ? (
    <Stack direction='row'>
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
  ) : null;
};

export default DashboardLayout;
