import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Logo from '../../assets/Images/logo.ico'
import axios, { AxiosError } from "axios";


const MainLayout = () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN HERE: >>> ", token);
  if (token) {
    const auth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/me");
        console.log(response.data); // For example, log the response data
      } catch (error) {
        console.error("Error fetching authentication information:", error);
      }
    };
    console.log("DATAAAA: ", auth);
  }

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth='sm'>
        <Stack spacing={5}>
          <Stack sx={{ width: '100%' }} direction='column' alignItems={'center'}>
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Container>

    </>
  );
};

export default MainLayout;
