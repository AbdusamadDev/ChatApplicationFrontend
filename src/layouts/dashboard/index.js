import { Navigate, Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import SideBar from "./SideBar";
import { useEffect } from "react";
import axios from "axios";

const isAuthenticated = true;

const DashboardLayout = () => {
  async function getMe() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkdXNhbWFkIiwiZXhwIjoxNzQ0NjEwMDU4fQ.o8vTogEZv1A3YCRc_4zY4MthBCTVMRWT1a3foPCrjnI";
    let me = await axios.get("http://localhost:5000/auth/me", { headers: { "Authorization": `Bearer ${token}` } })
    // console.log("User: ", me);
    sessionStorage.setItem('user',JSON.stringify(me.data));
  }
  useEffect(()=>{
    getMe()
  },[])

if(!isAuthenticated){
  return <Navigate to='/auth/login'/>;
}


  return (
    <Stack direction='row'>
      {/* SideBar */}
      <SideBar/>
      <Outlet />
    </Stack>
    
  );
};

export default DashboardLayout;
