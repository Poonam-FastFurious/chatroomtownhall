/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketContext";
import axios from "axios";
import { Baseurl } from "../Confige";
import Cookies from "js-cookie";
import { useMessages } from "./Context/MessageContext";
function Sendmessage({ chatId }) {
  const userId = Cookies.get("userId");
  const { socket } = useSocket();
  const { messages, setMessages } = useMessages(); // Use context
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const messagesEndRef = useRef(null);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]); // Update context
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleDocumentChange = (e) => {
    setDocuments([...e.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() || images.length > 0 || documents.length > 0) {
      const formData = new FormData();
      formData.append("content", message);
      formData.append("chatId", chatId);
      console.log("Images:", images);
      console.log("Documents:", documents);

      // Append image files to FormData
      for (const image of images) {
        formData.append("images", image);
      }

      // Append document files to FormData
      for (const document of documents) {
        formData.append("documents", document);
      }

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      try {
        const response = await axios.post(
          `${Baseurl}/api/v1/message`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);

        // Emit message to socket after API response
        const tempMessage = {
          content: message,
          chatId,
          sender: { _id: userId },
          createdAt: new Date().toISOString(),
          images: images.map((image) => URL.createObjectURL(image)), // Add the images URLs from response
          documents: documents.map((doc) => URL.createObjectURL(doc)), // Add the documents URLs from response
        };
        socket.emit("message", tempMessage);

        // Clear form fields
        setMessage("");
        setImages([]);
        setDocuments([]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <>
      <div className="z-40 w-full p-6 mb-0  border-t lg:mb-1 border-gray-50">
        <form
          className="p-4 border-t"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2">
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

              {documents.map((document, index) => (
                <div key={index} className="text-xs text-gray-600">
                  {document.name}
                </div>
              ))}
            </div>
            <div className="flex-grow">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14"
                placeholder="Enter Message..."
              />
            </div>
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
                className="btn group/tooltip group-data-[theme-color=red] text-[#B08D57] group-data-[theme-color=red]:text-red-500 text-16"
              >
                <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Attach Image
                  </span>
                </div>
                <i className="ri-image-line"></i>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                className="hidden"
                id="documentInput"
                onChange={handleDocumentChange}
              />
              <label
                htmlFor="documentInput"
                className="btn group/tooltip group-data-[theme-color=red] text-[#B08D57] group-data-[theme-color=red]:text-red-500 text-16"
              >
                <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-black whitespace-no-wrap bg-black rounded shadow-lg">
                    Attach Document
                  </span>
                </div>
                <i className="ri-file-line"></i>
              </label>
            </div>

            <div>
              <ul className="mb-0">
                <li className="inline-block">
                  <button
                    type="submit"
                    className="text-white border-transparent btn bg-[#B08D57] group-data-[theme-color=red]:bg-red-500 hover:bg-[#B08D57]"
                  >
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Sendmessage;
