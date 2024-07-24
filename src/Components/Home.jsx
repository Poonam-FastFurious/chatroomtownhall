/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";

import Slider from "react-slick";
import Asidemenu from "./Asidemenu";
import CreateGroup from "./CreateGroup";
import GruopList from "./GruopList";
import ProfileSettings from "./ProfileSettings";
import { Link } from "react-router-dom";
import { Baseurl } from "../Config";

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatData, setChatData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("chatlist");
  const [showChat, setShowChat] = useState(false);
  var settings = {
    slidesToShow: 4, // Show 4 items
    slidesToScroll: 1, // Scroll 1 item at a time
    infinite: false, // Disable infinite loop
    speed: 500, // Transition speed
    margin: 16, // Margin between slides (not directly supported by slick but can be managed with CSS)
    arrows: false, // Hide navigation arrows
    dots: false, // Hide dots
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    // Function to get query parameter values by name

    const token = Cookies.get("accessToken");
    // Fetch users from the API
    fetch(Baseurl + "/api/v1/chat/getallchat", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      const token = Cookies.get("accessToken");

      // Fetch chat data from the API
      fetch(`${Baseurl}/api/v1/message/${selectedUser._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setChatData(data);
        })
        .catch((error) => {
          console.error("Error fetching chat data:", error);
        });
    }
  }, [selectedUser]);
  const handleMenuClick = (tab) => {
    setActiveTab(tab);
  };
  const handleUserClick = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      setShowChat(!showChat); // Toggle chat visibility
      return;
    }
    setSelectedUser(user);
    setShowChat(true);
  };
  console.log(chatData);

  return (
    <>
      <div className="lg:flex justify-between">
        <Asidemenu onMenuClick={handleMenuClick} />
        {activeTab === "chatlist" && (
          <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
            <div className="px-6 ">
              <h4 className="mb-0 text-gray-700 ">Chats</h4>

              <div className="py-1 mt-5 mb-5 rounded bg-slate-100">
                <span className="bg-slate-100 pe-1 ps-3" id="basic-addon1">
                  <i className="text-lg text-gray-400 ri-search-line search-icon "></i>
                </span>
                <input
                  type="text"
                  className="border-0 bg-slate-100 placeholder:text-[14px] focus:outline-none"
                  placeholder="Search messages or users"
                  aria-label="Search messages or users"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <div className="px-6 pb-6">
              <Slider
                {...settings}
                className="owl-carousel owl-theme"
                id="user-status-carousel"
              >
                {users.slice(0, 5).map((user, index) => (
                  <div key={index} className="text-center">
                    <Link
                      to="#"
                      className="block p-2 mt-4 rounded bg-slate-100"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="relative">
                        {user.placeholder ? (
                          <div className="flex items-center justify-center w-9 h-9 mx-auto bg-violet-500/20 rounded-full">
                            <span className="text-violet-500">T</span>
                          </div>
                        ) : (
                          <img
                            src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
                            alt="user-img"
                            className="mx-auto rounded-full w-9 h-9"
                          />
                        )}
                        <span className="absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full top-7 lg:right-5 "></span>
                      </div>
                      <h5 className="mt-4 mb-0 truncate text-13 ">
                        {user.isGroupChat
                          ? user.chatName
                          : user.users[1].firstName}
                      </h5>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>

            <div>
              <h5 className="px-6 mb-4 text-16 ">Recent</h5>

              <div className="h-[610px] px-2" data-simplebar>
                <ul className="chat-user-list">
                  {users.map((chat, index) => (
                    <li
                      key={index}
                      className={`px-5 py-[15px] hover:bg-slate-400 transition-all ease-in-out border-b border-white/20  ${
                        chat.unread ? "unread" : ""
                      } ${chat.typing ? "typing" : ""}`}
                      onClick={() => handleUserClick(chat)}
                    >
                      <Link to="#">
                        <div className="flex">
                          <div className="relative self-center ltr:mr-3 rtl:ml-3">
                            {chat.placeholder ? (
                              <div className="flex items-center justify-center w-9 h-9 bg-violet-500/20 rounded-full">
                                <span className="text-violet-500">G</span>
                              </div>
                            ) : (
                              <img
                                src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
                                className="w-9 h-9 rounded-full"
                                alt=""
                              />
                            )}
                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 "></span>
                          </div>

                          <div className="flex-grow overflow-hidden ml-4">
                            <h5 className="mb-1 text-base truncate ">
                              {chat.isGroupChat
                                ? chat.chatName
                                : `${chat.users[1].firstName} ${chat.users[1].lastName}`}
                            </h5>
                            {chat.typing ? (
                              <div className="flex items-end gap-2 mb-0 text-violet-500 text-14">
                                <p className="mb-0">typing</p>
                                <div className="animate-typing flex gap-0.5">
                                  <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot animate-bounce"></p>
                                  <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot-2"></p>
                                  <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot-3 animate-bounce"></p>
                                </div>
                              </div>
                            ) : (
                              <p
                                className={`mb-0 truncate  text-14 ${
                                  chat.unread
                                    ? "text-gray-800"
                                    : "text-gray-500"
                                }`}
                              >
                                {chat.latestMessage?.content || "No message"}
                              </p>
                            )}
                          </div>
                          <div className="text-gray-500 text-11 ">
                            {new Date(chat.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true, // Use `false` for 24-hour format, `true` for 12-hour format with AM/PM
                            })}
                          </div>
                          {chat.unread && (
                            <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                              <span className="px-2 py-1 text-red-500 bg-red-500/20 rounded-full text-11">
                                {chat.count}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contacts" && <CreateGroup />}
        {activeTab === "groups" && <GruopList />}
        {activeTab === "profile" && <ProfileSettings />}
        <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat">
          <div className="lg:flex">
            <div className="relative w-full overflow-hidden">
              <div className="p-4 border-b border-gray-100 lg:p-6">
                <div className="grid items-center grid-cols-12">
                  <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                      {selectedUser ? (
                        <>
                          <div className="rtl:ml-3 ltr:mr-3">
                            <img
                              src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
                              className="rounded-full h-9 w-9"
                              alt=""
                            />
                          </div>
                          <div className="flex-grow overflow-hidden ml-4">
                            <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                              <Link to="#" className="text-gray-800">
                                {selectedUser.isGroupChat
                                  ? selectedUser.chatName
                                  : `${selectedUser.users[1].firstName} ${selectedUser.users[1].lastName}`}
                              </Link>
                            </h5>
                            <h5 className="mb-0 truncate rtl:block ltr:hidden">
                              <Link to="#" className="text-gray-800 mt-8">
                                {new Date(
                                  selectedUser.updatedAt
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true, // Use `false` for 24-hour format, `true` for 12-hour format with AM/PM
                                })}
                              </Link>
                            </h5>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-800">
                          Select a user to start chatting
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-8">
                    <ul className="flex items-center justify-end lg:gap-4">
                      <li className="px-3">
                        <div className="relative dropstart">
                          <button
                            className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton10"
                            data-tw-auto-close="outside"
                          >
                            <i className="ri-search-line"></i>
                          </button>
                          <ul
                            className="absolute z-50 hidden mt-2 text-left list-none bg-white border rounded-lg shadow-lg w-fit border-gray-50 dropdown-menu top-8 bg-clip-padding"
                            aria-labelledby="dropdownMenuButton10"
                          >
                            <li className="p-2">
                              <input
                                type="text"
                                className="text-gray-500 border-0 rounded bg-gray-50 placeholder:text-14 text-14 focus:ring-0"
                                placeholder="Search.."
                              />
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="px-3">
                        <Link
                          to="#"
                          className="hidden text-gray-500 lg:block profileTab"
                        >
                          <i className="text-xl ri-group-line"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className=" chat-container h-[75vh] p-4 lg:p-6"
                data-simplebar=""
              >
                <ul className="mb-0">
                  {chatData.length > 0 ? (
                    chatData.map((chat, index) => (
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
                                <p className="mt-1 mb-0 text-xs text-right text-gray-100">
                                  <i className="align-middle ri-time-line"></i>
                                  <span className="align-middle text-black">
                                    {new Date(
                                      chat.createdAt
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true, // Use `false` for 24-hour format, `true` for 12-hour format with AM/PM
                                    })}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="font-medium text-gray-700 text-14">
                              {chat.sender._id === userId ? "Me" : "Other"}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="clear-both py-4">
                      <div className="text-center text-gray-500">
                        No messages yet
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="z-40 w-full p-6 mb-0 bg-white border-t lg:mb-1 border-gray-50">
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14"
                      placeholder="Enter Message..."
                    />
                  </div>
                  <div>
                    <div>
                      <ul className="mb-0">
                        <li className="inline-block" title="Attached File">
                          <button
                            type="button"
                            className="border-transparent btn group/tooltip group-data-[theme-color=red] text-[#B08D57] group-data-[theme-color=red]:text-red-500 text-16"
                          >
                            <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                              <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                                Attached File
                              </span>
                            </div>
                            <i className="ri-attachment-line"></i>
                          </button>
                        </li>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
