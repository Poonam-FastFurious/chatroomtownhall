/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// ChatContext.js
import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const showChat = () => setIsChatVisible(true);
  const hideChat = () => setIsChatVisible(false);

  return (
    <ChatContext.Provider value={{ isChatVisible, showChat, hideChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
