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

  return (
    <>
      <div
        className={`w-full overflow-hidden transition-all duration-150 bg-white user-chat ${
          isChatVisible ? "user-chat-show" : ""
        } `}
      >
        <div className="lg:flex">
          <div className="relative w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
              <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center">
                    <div
                      className="block ltr:mr-2 rtl:ml-2 lg:hidden"
                      onClick={hideChat}
                    >
                      <a
                        href=""
                        className="p-2 text-gray-500 user-chat-remove text-16"
                      >
                        <i className="ri-arrow-left-s-line"></i>
                      </a>
                    </div>
                    <div className="rtl:ml-3 ltr:mr-3">
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

                    <li className="px-3 " style={{ visibility: "hidden" }}>
                      <div className="relative dropdown">
                        <button
                          className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300"
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButton11"
                        >
                          <i className="ri-more-fill"></i>
                        </button>
                        <ul
                          className="absolute z-50 hidden w-40 py-2 mx-4 mt-2 text-left list-none bg-white border rounded shadow-lg ltr:-right-4 border-gray-50 dropdown-menu top-8 dark:bg-zinc-600 bg-clip-padding dark:border-gray-600/50 rtl:-left-5"
                          aria-labelledby="dropdownMenuButton11"
                        >
                          <li className="block lg:hidden">
                            <a
                              className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent profileTab dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                              href="#"
                            >
                              View profile
                              <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-user-2-line text-16"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
                                : " bg-gray-500 text-white"
                            }`}
                          >
                            <p className="mb-0">{message.content}</p>
                            {message.media &&
                              message.media.length > 0 &&
                              message.media.map((item) =>
                                item.fileType === "image" ? (
                                  <>
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
                                      <div className="absolute right-[10px] left-auto bottom-[10px]">
                                        <ul>
                                          <li className="inline-block p-2">
                                            <a
                                              download={item.originalName}
                                              href={item.filePath}
                                              className="font-medium"
                                            >
                                              <i className="text-lg ri-download-2-line"></i>
                                            </a>
                                          </li>
                                          <li className="relative self-start inline-block p-2 dropdown">
                                            <a
                                              className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                                              href="#"
                                              role="button"
                                              data-bs-toggle="dropdown"
                                              id="dropdownMenuButton17"
                                            ></a>
                                          </li>
                                        </ul>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <div
                                    key={item._id}
                                    className="flex flex-wrap items-center gap-2 attached-file mt-2"
                                  >
                                    <div className="overflow-hidden flex-grow-1">
                                      <div className="text-start">
                                        <h5 className="mb-1 truncate text-14 text-white">
                                          {item.originalName}
                                        </h5>
                                        <p className="mb-0  text-white truncate text-13">
                                          Document File
                                        </p>
                                      </div>
                                    </div>
                                    <div className="rtl:mr-4 ltr:ml-4">
                                      <div className="flex items-start gap-2">
                                        <div>
                                          <a
                                            download={item.originalName}
                                            href={item.filePath}
                                            className="font-medium"
                                          >
                                            <i className="text-lg  text-white ri-download-2-line"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
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
