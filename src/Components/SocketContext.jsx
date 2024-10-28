/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = "http://localhost:3000";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Retrieve the user ID from cookies
    const userId = Cookies.get("userId");

    // Check if userId is present
    if (!userId) {
      console.error("User ID not found in cookies");
      return;
    }

    // Initialize Socket.IO connection with user ID as a query parameter
    const socketIo = io(SOCKET_URL, {
      withCredentials: true, // Include credentials in requests
      query: { userId }, // Pass user ID as a query parameter
    });

    socketIo.on("connect", () => {
      console.log(`Connected to socket server with userId: ${userId}`);
    });

    socketIo.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Handle incoming image data
    socketIo.on("image", (data) => {
      const arrayBufferView = new Uint8Array(data.data);
      const blob = new Blob([arrayBufferView], { type: data.type });
      const imageUrl = URL.createObjectURL(blob);
      setImageData(imageUrl);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = () => {
    if (file && socket) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = {
          name: file.name,
          type: file.type,
          data: reader.result,
        };
        socket.emit("uploadImage", imageData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, handleFileChange, handleUpload, imageData }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Example usage of the context in a component
const FileUploadAndImageDisplay = () => {
  const { handleFileChange, handleUpload, imageData } = useSocket();

  return (
    <div>
      <h1>Socket.IO File Upload and Display</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      <div>
        {imageData && (
          <img
            src={imageData}
            alt="Received"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default FileUploadAndImageDisplay;
