import axios from 'axios';
import { Box, Stack } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';

const Message = ({ menu }) => {
  const messageContainerRef = useRef(null);
  let [messages, setMessages] = useState([]);
  let [newMessages, setNewMessages] = useState([]);
  let user = JSON.parse(sessionStorage.getItem('user'));

  async function fetchMessages() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkdXNhbWFkIiwiZXhwIjoxNzQ0NjEwMDU4fQ.o8vTogEZv1A3YCRc_4zY4MthBCTVMRWT1a3foPCrjnI";
    let messages = await axios.get("http://192.168.100.39:5000/api/messages/group_6f82b02a-bc8a-4999-a62d-c467bf2bbb1d", { headers: { "Authorization": `Bearer ${token}` } });
    // console.log("The messages: ", messages);
    setMessages(messages.data.data)
  }

  useEffect(
    () => {
      fetchMessages();
    }, []
  )

  const socket = new WebSocket('ws://192.168.100.39:8000/chat/1/group_6f82b02a-bc8a-4999-a62d-c467bf2bbb1d')

  function handleGetMessages() { // Fixed function name
    socket.onmessage = (value) => {
      setNewMessages((newMessages) => ([...newMessages, JSON.parse(value.data)]));
      scrollToBottom();
    }
  }

  useEffect(() => {
    handleGetMessages()
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages, newMessages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <Box p={3} ref={messageContainerRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <Stack spacing={3}>
        {
          messages?.concat(newMessages)?.map((clb, ind) => {
            return <TextMsg key={ind} el={clb} menu={menu} userID={user?.id} />;
          })
        }
        {messages?.concat(newMessages)?.map((el) => {
          switch (el.type) {
            case 'divider':
              return <TimeLine el={el} />
            case 'msg':
              switch (el.subtype) {
                case 'img':
                  return <MediaMsg el={el} menu={menu} />
                case 'doc':
                  return <DocMsg el={el} menu={menu} />

                case 'link':
                  return <LinkMsg el={el} menu={menu} />
                case 'reply':
                  return <ReplyMsg el={el} menu={menu} />

                default:
                  return <TextMsg el={el} menu={menu} userID={user?.id} />
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  )
}

export default Message;
