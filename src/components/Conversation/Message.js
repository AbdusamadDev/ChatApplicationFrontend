import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
import axios from 'axios';
import { logDOM } from '@testing-library/react';

const Message = ({ menu }) => {
  let [state, name] = useState();
  async function fetchMessages() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkdXNhbWFkIiwiZXhwIjoxNzQ0NjEwMDU4fQ.o8vTogEZv1A3YCRc_4zY4MthBCTVMRWT1a3foPCrjnI";
    let messages = await axios.get("http://localhost:5000/api/messages/group_763b5f5e-464f-4b87-a7c4-14fee99c8849", { headers: { "Authorization": `Bearer ${token}` } });
    // console.log("The messages: ", messages);
    name(messages.data.data)
  }
  let [user, setUser] = useState();
  async function getMe() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkdXNhbWFkIiwiZXhwIjoxNzQ0NjEwMDU4fQ.o8vTogEZv1A3YCRc_4zY4MthBCTVMRWT1a3foPCrjnI";
    let me = await axios.get("http://localhost:5000/auth/me", { headers: { "Authorization": `Bearer ${token}` } })
    console.log("User: ", me);
    setUser(me.data);
  }
  useEffect(
    () => {
      fetchMessages();
      getMe();
    }, []
  )
  console.log("The state: ", state);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {
          state?.map((clb) => {
            return <TextMsg el={clb} menu={menu} userID={user?.id} />;
          })
        }
        {/* {state.map((el)=>{
                switch (el.type) {
                    case 'divider':
                      return <TimeLine el={el}/>
                        
                    case 'msg':
                        switch (el.subtype) {
                            case 'img':
                              return <MediaMsg el={el} menu={menu}/>
                            case 'doc':
                                return <DocMsg el={el} menu={menu}/>
                                
                            case 'link':
                                return <LinkMsg el={el} menu={menu}/>
                            case 'reply':
                                return <ReplyMsg el={el} menu={menu}/>
                        
                            default:
                               return <TextMsg el={el} menu={menu}/>
                        }
                        break;
                
                    default:
                      return <></>;
                }
            })} */}
      </Stack>
    </Box>
  )
}

export default Message