/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketContext";
import Cookies from "js-cookie";
import { useMessages } from "./Context/MessageContext";

function Sendmessage({ chatId }) {
  const userId = Cookies.get("userId");
  const { socket } = useSocket();
  const { messages, setMessages } = useMessages(); // Use context
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const messagesEndRef = useRef(null);

  // Listen to socket for new messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]); // Update context with new messages
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, setMessages]);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store selected images
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if message or images exist before sending
    if (message.trim() || images.length > 0) {
      const tempMessage = {
        content: message,
        chatId,
        sender: { _id: userId },
        createdAt: new Date().toISOString(),
        images: images.map((image) => URL.createObjectURL(image)), // Convert image files to local URLs
      };

      // Emit message to socket with content and images
      socket.emit("message", tempMessage);

      setMessage("");
      setImages([]);
    }
  };

  return (
    <>
      <div className="z-40 w-full p-6 mb-0 border-t lg:mb-1 border-gray-50">
        <form
          className="p-4 border-t"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2">
            {/* Display selected images before sending */}
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="w-12 h-12">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              ))}
            </div>

            {/* Input field for entering message */}
            <div className="flex-grow">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14"
                placeholder="Enter Message..."
              />
            </div>

            {/* Image input */}
            <div className="flex-grow">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="imageInput"
                onChange={handleImageChange}
              />
              <label
                htmlFor="imageInput"
                className="btn text-[#B08D57] text-16"
              >
                <i className="ri-image-line"></i> Attach Image
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="text-white border-transparent btn bg-[#B08D57] hover:bg-[#B08D57]"
              >
                <i className="ri-send-plane-2-fill"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Sendmessage;
