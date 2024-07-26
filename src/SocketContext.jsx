/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = "http://localhost:3000"; // Ensure this matches your server's URL

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Retrieve the user ID from local storage or any other state management
    const userId = Cookies.get("userId");

    // Initialize Socket.IO connection with user ID as a query parameter
    const socketIo = io(SOCKET_URL, {
      withCredentials: true, // Include credentials in requests
      query: { userId }, // Pass user ID as a query parameter
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
