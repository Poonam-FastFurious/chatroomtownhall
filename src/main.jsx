import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./Components/SocketContext.jsx";
import { ChatProvider } from "./Components/ChatContext/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ChatProvider>
  </StrictMode>
);
