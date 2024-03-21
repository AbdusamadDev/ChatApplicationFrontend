import axios from 'axios';
import { Box, Stack } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
import { useNavigate } from 'react-router-dom';

const Message = ({ menu, selectedGroup }) => {
  const messageContainerRef = useRef(null);
  let [messages, setMessages] = useState([]);
  let [userDetails, setUserDetails] = useState([]);
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        navigate('/auth/login');
      });
  }, []);

  async function fetchMessages() {
    const token = localStorage.getItem("token");
    if (selectedGroup) { // Fetch messages only if a group is selected
      let messages = await axios.get(`http://192.168.100.39:5000/api/messages/${selectedGroup}`, { headers: { "Authorization": `Bearer ${token}` } });
      console.log("The messages: ", messages);
      setMessages(messages.data.data);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedGroup]);


  // function handleGetMessages() { // Fixed function name
  //   socket.onmessage = (value) => {
  //     setNewMessages((newMessages) => ([...newMessages, JSON.parse(value.data)]));
  //     scrollToBottom();
  //   }
  // }

  // useEffect(() => {
  //   handleGetMessages()
  // }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <Box p={3} ref={messageContainerRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <Stack spacing={3}>
        {
          messages?.concat(messages)?.map((clb, ind) => {
            console.log("The clb: ", clb);
            return <TextMsg key={ind} el={clb} menu={menu} userID={userDetails.id} />;
          })
        }
        {messages?.concat(messages)?.map((el) => {
          switch (el.type) {
            case 'divider':
              return <TimeLine el={el} />
            case 'msg':
              console.log("The el: ", el);
              // switch (el.subtype) {
              //   case 'img':
              //     return <MediaMsg el={el} menu={menu} />
              //   case 'doc':
              //     return <DocMsg el={el} menu={menu} />

              //   case 'link':
              //     return <LinkMsg el={el} menu={menu} />
              //   case 'reply':
              //     return <ReplyMsg el={el} menu={menu} />

              // default:
              return <TextMsg el={el} menu={menu} userID={el.user?.id} />
            // }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  )
}

export default Message;