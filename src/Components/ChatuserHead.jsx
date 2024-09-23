/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import Cookies from "js-cookie";
import { Baseurl } from "../Confige";
import { useEffect, useRef, useState } from "react";
import Sendmessage from "./Sendmessage";
import { useMessages } from "./Context/MessageContext";
import bgimage from "../../assets/images/chatbackend.jpeg";
import { useChat } from "./ChatContext/ChatContext";

function ChatuserHead({ chat, onProfileClick }) {
  const { isChatVisible, hideChat } = useChat();
  const [chatData, setChatData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const userId = Cookies.get("userId");
  const { messages } = useMessages();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat && chat._id) {
      setCurrentChatId(chat._id);
      const token = Cookies.get("accessToken");

      fetch(`${Baseurl}/api/v1/message/${chat._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setChatData(data))
        .catch((error) => {
          console.error("Error fetching chat data:", error);
        });
    }
    fetch(`${Baseurl}/api/v1/user/alluser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setAllUsers(data.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [chat]);

  const getUserImage = (senderId) => {
    const user = allUsers.find((user) => user._id === senderId);
    return user && user.profilePhoto
      ? user.profilePhoto
      : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
  };

  const getUserActiveStatus = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    return user?.isActive; // Assuming 'isActive' is a boolean indicating the active status
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData, messages]);
  const chatName = chat?.isGroupChat
    ? chat.chatName
    : chat?.users?.find((user) => user._id !== Cookies.get("userId"))
        ?.firstName +
      " " +
      chat?.users?.find((user) => user._id !== Cookies.get("userId"))?.lastName;

  const chatUserId = chat?.users?.find(
    (user) => user._id !== Cookies.get("userId")
  )?._id;
  const pinnedMessages = chatData.filter((message) => message.isPinned);
  return (
    <>
      <div
        className={`w-full overflow-hidden transition-all duration-150 bg-white user-chat ${
          isChatVisible ? "user-chat-show" : ""
        } `}
      >
        <div className="lg:flex">
          <div className="relative w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100  dark:border-zinc-600">
              <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center">
                    <div
                      className="block mr-2 rtl:ml-2 lg:hidden"
                      onClick={hideChat}
                    >
                      <a
                        href=""
                        className="p-2 text-gray-500 user-chat-remove text-16"
                      >
                        <i className="ri-arrow-left-s-line"></i>
                      </a>
                    </div>
                    <div className="">
                      <img
                        src={getUserImage(chatUserId)}
                        className="rounded-full h-9 w-9"
                        alt=""
                      />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                        <a href="#" className="text-gray-800 dark:text-gray-50">
                          {chatName || "Chat"}
                        </a>
                        {getUserActiveStatus(chatUserId) && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                  <ul className="flex items-center justify-end lg:gap-4">
                    <li className="px-3">
                      <a
                        onClick={() => onProfileClick(chat._id)}
                        href="#"
                        className=" text-gray-500 dark:text-gray-300 lg:block profileTab"
                      >
                        <i className="text-xl ri-group-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* pinned section  */}
            {pinnedMessages.length > 0 && (
              <div className="p-4 border-b border-gray-100  dark:border-zinc-600">
                <div className="grid items-center grid-cols-12">
                  <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4a1 1 0 0 1 1 1z"
                          />
                        </svg>
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                          {pinnedMessages.length > 0 ? (
                            pinnedMessages.map((mesage, index) => (
                              <a
                                key={index}
                                href="#"
                                className="text-gray-800 dark:text-gray-50"
                              >
                                {mesage.content}
                              </a>
                            ))
                          ) : (
                            <>no pinned</>
                          )}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="h-[75vh]  p-4 lg:p-6 overflow-y-auto "
              data-simplebar=""
              style={{ backgroundImage: `url(${bgimage})` }}
            >
              <ul className="mb-0">
                {chatData.map((message, index) => (
                  <li key={index} className="clear-both py-4">
                    <div
                      className={`flex items-end gap-3 ${
                        message.sender._id === userId ? "justify-end" : ""
                      }`}
                    >
                      {message.sender._id !== userId && (
                        <div>
                          <img
                            src={getUserImage(message.sender._id)}
                            alt=""
                            className="rounded-full h-9 w-9"
                          />
                        </div>
                      )}

                      <div>
                        <div className="flex gap-2 mb-2">
                          <div
                            className={`relative px-5 py-3 rounded-lg ${
                              message.sender._id === userId
                                ? "bg-[#CA9352] text-gray-700 float-right"
                                : "bg-gray-500 text-white"
                            }`}
                          >
                            <p className="mb-0">{message.content}</p>
                            {message.media &&
                              message.media.length > 0 &&
                              message.media.map((item) => (
                                // Render media items as in your original code
                                <li
                                  className="relative inline-block mr-2"
                                  key={item._id}
                                >
                                  <div>
                                    <a
                                      className="inline-block m-1 popup-img"
                                      href={item.filePath}
                                      download={item.originalName}
                                      title={item.originalName}
                                    >
                                      <img
                                        src={item.filePath}
                                        alt={item.originalName}
                                        className="border rounded h-28"
                                      />
                                    </a>
                                  </div>
                                </li>
                              ))}
                            <p
                              className={`mt-1 mb-0 text-xs ${
                                message.sender._id === userId
                                  ? "text-left text-white"
                                  : "text-right text-white/50"
                              }`}
                            >
                              <i className="align-middle ri-check-line"></i>
                              <span className="align-middle">
                                {new Date(message.sentOn).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div
                          className={`font-medium text-gray-700 text-14 ${
                            message.sender._id === userId ? "text-right" : ""
                          }`}
                        >
                          {message.sender._id === userId ? "Me" : "Other"}
                        </div>
                      </div>

                      {message.sender._id === userId && (
                        <div>
                          <img
                            src={getUserImage(userId)}
                            alt=""
                            className="rounded-full h-9 w-9"
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="mb-0">
                {messages.length > 0 ? (
                  messages
                    .filter((message) => message.chatId === currentChatId) // Filter messages based on chatId
                    .map((chat, index) => (
                      <li className="clear-both py-4" key={index}>
                        <div
                          className={`flex items-end gap-3 ${
                            chat.sender._id === userId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {chat.sender._id !== userId && (
                            <div>
                              <img
                                src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
                                alt=""
                                className="rounded-full h-9 w-9"
                              />
                            </div>
                          )}
                          <div>
                            <div
                              className={`flex gap-2 mb-2 ${
                                chat.sender._id === userId
                                  ? "flex-row-reverse"
                                  : ""
                              }`}
                            >
                              <div
                                className={`relative px-5 py-3 rounded-lg ${
                                  chat.sender._id === userId
                                    ? "bg-[#B08D57] text-white rounded-br-none"
                                    : "bg-gray-200 text-black rounded-bl-none"
                                }`}
                              >
                                <p className="mb-0">{chat.content}</p>
                                {chat.images &&
                                  chat.images.length > 0 &&
                                  chat.images.map((item, imgIndex) => (
                                    <li
                                      className="relative inline-block mr-2"
                                      key={imgIndex}
                                    >
                                      <div>
                                        <a
                                          className="inline-block m-1 popup-img"
                                          href={item}
                                          download
                                          title={`Image ${imgIndex}`}
                                        >
                                          <img
                                            src={item}
                                            alt={`Image ${imgIndex}`}
                                            className="border rounded h-28"
                                          />
                                        </a>
                                      </div>
                                      <div className="absolute right-[10px] left-auto bottom-[10px]">
                                        <ul>
                                          <li className="inline-block p-2">
                                            <a
                                              download
                                              href={item}
                                              className="font-medium"
                                            >
                                              <i className="text-lg ri-download-2-line"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  ))}
                                {chat.documents &&
                                  chat.documents.map((doc, docIndex) => (
                                    <a
                                      key={docIndex}
                                      href={doc}
                                      download
                                      className="block bg-gray-200 p-2 rounded my-2"
                                    >
                                      Document {docIndex + 1}
                                    </a>
                                  ))}

                                <p className="mt-1 mb-0 text-xs text-right text-gray-100">
                                  <i
                                    className={`align-middle ri-check-line`}
                                  ></i>
                                  <span className="align-middle text-black">
                                    {new Date(
                                      chat.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div
                              className={`font-medium text-gray-700 text-14 ${
                                chat.sender._id === userId ? "text-right" : ""
                              }`}
                            >
                              {chat.sender._id === userId ? "Me" : "Other"}
                            </div>
                          </div>

                          {chat.sender._id === userId && (
                            <div>
                              <img
                                src={getUserImage(userId)}
                                alt="dddd"
                                className="rounded-full h-9 w-9"
                              />
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                ) : (
                  <li className="clear-both py-4">
                    <div className="text-center text-gray-500"></div>
                  </li>
                )}

                <div ref={messagesEndRef} />
              </ul>
            </div>

            <Sendmessage chatId={chat._id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatuserHead;
