/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../Confige";
import Cookies from "js-cookie";
import { useChat } from "./ChatContext/ChatContext";

function Chatsection({ onUserClick }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState(null); // Track active chat
  const userId = Cookies.get("userId");
  const { showChat } = useChat();
  const handleUserClick = (chat) => {
    setActiveChatId(chat._id);
    onUserClick(chat); // Pass the user ID to the parent component
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");

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
        const hall1Chat = data.find(
          (chat) => chat.chatName === "HALL 1 (General)"
        );
        if (hall1Chat) {
          setActiveChatId(hall1Chat._id);
          onUserClick(hall1Chat); // Pass the user ID to the parent component
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = users
    .filter((chat) => {
      const user = chat.users.find((u) => u._id !== userId);
      const chatName = chat.isGroupChat
        ? chat.chatName
        : user?.firstName || "Unknown User";

      // Filter out chats where user is null or undefined
      return user && chatName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      // Always move "Hall 1 (General)" chat to the top
      if (a.chatName === "HALL 1 (General)") return -1;
      if (b.chatName === "HALL 1 (General)") return 1;

      return a.chatName.localeCompare(b.chatName);
    });

  return (
    <div className="chat-leftsidebar lg:w-[380px] h-100% overflow-hidden shadow mb-[80px] lg:mb-0 bg-gray-200">
      <div className="tab-content active flex flex-col h-full">
        <div>
          <div className="px-6 pt-6">
            <h4 className="mb-0 text-gray-700 ">Chats</h4>
            <div className="py-1 mt-5 mb-5 rounded bg-[#CA9352]">
              <span className=" pe-1 ps-3" id="basic-addon1">
                <i className="text-lg text-white ri-search-line search-icon "></i>
              </span>
              <input
                type="text"
                className="border-0 bg-[#CA9352] placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:text-white"
                placeholder="Search messages or users"
                aria-label="Search messages or users"
                aria-describedby="basic-addon1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto hide-scrollbar">
          <ul className="chat-user-list">
            {filteredUsers.map((chat, index) => {
              const user = chat.users.find((u) => u._id !== userId);
              const profilePhotoUrl =
                user?.profilePhoto ||
                "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"; // Default image if no profile photo
              const isActive = user?.Active || false;
              const isSelected = activeChatId === chat._id;
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleUserClick(chat);
                    showChat();
                  }}
                  className={`px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 hover:bg-gray-100 transition-all ease-in-out border-b border-black/20 rounded-md ${
                    isSelected ? "bg-gray-400" : ""
                  }`}
                >
                  <Link to="#">
                    <div className="flex gap-8">
                      <div className="relative self-center ml-3">
                        <img
                          src={profilePhotoUrl}
                          className="rounded-full w-9 h-9"
                          alt=""
                        />
                        {isActive && (
                          <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1"></span>
                        )}
                      </div>

                      <div className="flex-grow overflow-hidden">
                        <h5 className="mb-1 text-base truncate">
                          {chat.isGroupChat
                            ? chat.chatName
                            : `${user?.firstName} ${user?.lastName}`}
                        </h5>
                        <p className="mb-0 text-gray-500 truncate text-14">
                          {chat.latestMessage && chat.latestMessage.content
                            ? chat.latestMessage.content
                            : "Start a conversation"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chatsection;
