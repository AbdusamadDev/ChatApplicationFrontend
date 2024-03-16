import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography, Button, Divider, Avatar } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';

const Chats = () => {
  const theme = useTheme();
  const [groups, setGroups] = useState([]);
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetch('http://localhost:5000/api/groups', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => { setGroups(data.groups.data) })
      .catch(error => console.error('Error fetching groups:', error));
  }, [token]);

  const handleGroupClick = (groupId) => {
    sessionStorage.setItem('targetGroup', groupId);
  };
  return (
    <Box sx={{
      position: "relative", width: 320,
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Groups
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
              All Groups
            </Typography>
            {groups.map((group, index) => (
              <Box key={index} onClick={() => handleGroupClick(group.uniqueName)} sx={{ cursor: 'pointer' }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar />
                  <Box>
                    <Typography>{group.title}</Typography>
                    <Typography variant='body2'>{group.description}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Chats;
