// // src/components/Chat.js
// import { useEffect, useState } from "react";
// import { useSocket } from "../../SocketContext";

// const Chat = () => {
//   const { socket } = useSocket();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (socket) {
//       socket.on("message", (data) => {
//         setMessages((prevMessages) => [...prevMessages, data]);
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off("message");
//       }
//     };
//   }, [socket]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       socket.emit("message", { text: message });
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg.text}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
