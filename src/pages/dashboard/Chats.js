import React, { useState, useEffect } from 'react';
import { Box, IconButton, Stack, Typography, Button, Divider } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import ChatElement from '../../components/ChatElement';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';

const Chats = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);

  // Assume token is stored in localStorage under the key 'token'. Adjust as needed.
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkdXNhbWFkIiwiZXhwIjoxNzQ0NjEwMDU4fQ.o8vTogEZv1A3YCRc_4zY4MthBCTVMRWT1a3foPCrjnI";

  useEffect(() => {
    // Fetch messages from the backend URL
    fetch('http://192.168.100.39:5000/api/messages/group_6f82b02a-bc8a-4999-a62d-c467bf2bbb1d', {
      headers: {
        Authorization: `Bearer ${token}` // Send token in the Authorization header
      }
    })
      .then(response => response.json())
      .then(data => { setMessages(data.data) })
      .catch(error => console.error('Error fetching messages:', error));
  }, [token]);


  return (
    <Box sx={{
      position: "relative", width: 320,
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Chats
          </Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>

        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>
              Archive
            </Button>
          </Stack>
          <Divider />
        </Stack>

        <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
          <Stack spacing={2.4}>
            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {messages.map((message, index) => (
              <ChatElement key={index} message={message} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Chats;
