/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";

function UserList({ onUserClick }) {
  const [user, setUser] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/alluser")
      .then((response) => response.json())
      .then((data) => setUser(data.data));
  }, []);

  // Function to group users by the first letter of their names
  const groupUsersByFirstLetter = (users) => {
    return users.reduce((groups, user) => {
      const firstLetter = user.firstName.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(user);
      return groups;
    }, {});
  };

  const groupedUsers = groupUsersByFirstLetter(user);

  // Get an array of the sorted letters
  const sortedLetters = Object.keys(groupedUsers).sort();
  const handleUserClick = (userId) => {
    // Call the passed down callback function
    if (onUserClick) {
      onUserClick(userId);
    }
    // Access chat with the user
    accessChat(userId);
  };
  const accessChat = (userId) => {
    fetch("http://localhost:3000/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Chat accessed successfully:", data);
        // Handle the chat access response here (e.g., redirect to chat page, update state, etc.)
      })
      .catch((error) => {
        console.error("Error accessing chat:", error);
        // Handle error here (e.g., show error message)
      });
  };
  return (
    <>
      <div className="tab-content">
        <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
          <div className="p-6 pb-0">
            <div className="ltr:float-right rtl:float-left">
              <div className="relative">
                <button
                  type="button"
                  className="px-4 text-lg text-gray-500 group/tag"
                  data-tw-toggle="modal"
                  data-tw-target="#modal-id2"
                >
                  <i className="mr-1 ri-user-add-line ms-0 "></i>
                  <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-4 rtl:-right-8"></span>
                </button>
              </div>
            </div>
            <h4 className="mb-6 ">Search User</h4>

            <div className="py-1 mt-5 mb-5 bg-slate-100 rounded">
              <span className="bg-slate-100 pe-1 ps-3" id="basic-addon">
                <i className="text-lg text-gray-700 ri-search-line search-icon"></i>
              </span>
              <input
                type="text"
                className="border-0 bg-slate-100 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0"
                placeholder="Search users.."
                aria-describedby="basic-addon"
              />
            </div>
          </div>

          <div className="h-[80vh]" data-simplebar="">
            <div className="p-6">
              {sortedLetters.map((letter) => (
                <div key={letter} className="mt-3">
                  <div className="p-3 font-bold text-violet-500">{letter}</div>
                  <ul className="list-unstyled contact-list">
                    {groupedUsers[letter].map((user) => (
                      <li
                        key={user._id}
                        className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 "
                        onClick={() => handleUserClick(user._id)}
                      >
                        <a href="#">
                          <div className="flex">
                            <div className="relative self-center ltr:mr-3 rtl:ml-3">
                              <img
                                src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
                                className="rounded-full w-9 h-9"
                                alt=""
                              />
                              <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                            </div>

                            <div className="flex-grow overflow-hidden ml-4">
                              <h5 className="mb-1 text-base truncate dark:text-gray-50">
                                {user.firstName}
                              </h5>
                              <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">
                                Hey! there I'm available
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
