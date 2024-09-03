/* eslint-disable react/prop-types */

import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Baseurl } from "../Confige";
import { useEffect, useRef, useState } from "react";
import Sendmessage from "./Sendmessage";
import { useMessages } from "./Context/MessageContext";
import bgimage from "../../assets/images/chatbackend.jpeg";

function ChatuserHead({ chat, onProfileClick }) {
  const [chatData, setChatData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [icon, setIcon] = useState("ri-time-line");
  const userId = Cookies.get("userId");
  const { messages } = useMessages();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat && chat._id) {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setIcon("ri-check-line"); // Change this to the new icon class if needed
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const getUserImage = (senderId) => {
    const user = allUsers.find((user) => user._id === senderId);
    return user
      ? user.profilePhoto
      : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
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
  console.log("imagetesting ", messages);
  console.log("imagetestingdhghhd ", chatData);

  return (
    <>
      <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat ">
        <div className="lg:flex">
          <div className="relative w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 lg:p-6 ">
              <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex items-center gap-4">
                    <div className="block ">
                      <Link
                        to="#"
                        className="p-2 text-gray-500 user-chat-remove text-16"
                      >
                        <i className="ri-arrow-left-s-line"></i>
                      </Link>
                    </div>
                    <div className="rtl:ml-3 ltr:mr-3">
                      <img
                        src={getUserImage(chatUserId)}
                        className="rounded-full h-9 w-9 cursor-pointer"
                        alt=""
                        onClick={() => onProfileClick(chat._id)}
                      />{" "}
                      {getUserActiveStatus(chatUserId) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="mb-0 truncate text-16 ">
                        <span to="#" className="text-gray-800 ">
                          {chatName || "Chat"}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-[75vh] p-4 lg:p-6 overflow-y-auto "
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
                              <i className="align-middle ri-time-line"></i>
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
                  messages.map((chat, index) => (
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
                              {chat.media &&
                                chat.media.length > 0 &&
                                chat.media.map((item) =>
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
                              <p className="mt-1 mb-0 text-xs text-right text-gray-100">
                                <i className={`align-middle ${icon}`}></i>
                                <span className="align-middle text-black">
                                  {new Date(chat.createdAt).toLocaleTimeString(
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
                              alt=""
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
