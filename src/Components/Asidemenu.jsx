/* eslint-disable react/prop-types */
// Asidemenu.js

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Baseurl } from "../Confige";

const Asidemenu = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const Id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    fetch(`${Baseurl}/api/v1/user/currentuser?userId=${Id}`)
      .then((responce) => responce.json())
      .then((data) => setUser(data.data));
  }, [Id]);
  const handleLogout = async () => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem("userId"); // Adjust the key according to your storage key

    try {
      // Make an API call to logout with user ID in the request body
      await fetch(`${Baseurl}/api/v1/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
        body: JSON.stringify({ userId }), // Include userId in the request body
      });

      // Clear local storage
      localStorage.clear();

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirect to the login page
      setTimeout(() => {
        // Redirect to the login page
        navigate("/Login");
      }, 1000);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <>
      <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white ">
        <div className="hidden lg:my-5 lg:block">
          <Link to="/" className="block ">
            <span>
              <img
                src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/logo.svg"
                alt=""
                className="h-[30px]"
              />
            </span>
          </Link>
        </div>

        <div className="w-full mx-auto lg:my-auto">
          <ul
            id="tabs"
            className="flex flex-row justify-center w-full lg:flex-col lg:flex nav-tabs"
          >
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("profile")}
                className="tab-button flex flex-col relative items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div>
                  <i className="text-2xl ri-user-2-line"></i>
                </div>
                <div>
                  <span className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap  rounded ">
                    Profile
                  </span>
                </div>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("chatlist")}
                className="tab-button active relative flex flex-col items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div>
                  <i className="text-2xl ri-message-3-line"></i>
                </div>
                <div>
                  <span className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap  rounded ">
                    Chats
                  </span>
                </div>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("groups")}
                className="tab-button relative flex flex-col items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div>
                  <i className="text-2xl ri-group-line"></i>
                </div>
                <div>
                  <span className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap  rounded ">
                    Groups
                  </span>
                </div>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("contacts")}
                className="tab-button relative flex flex-col items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div>
                  {" "}
                  <i className="text-2xl ri-contacts-line"></i>
                </div>
                <div>
                  <span className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap  rounded ">
                    Contacts
                  </span>
                </div>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("settings")}
                className="tab-button relative flex flex-col items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div>
                  <i className="text-2xl ri-settings-2-line"></i>
                </div>
                <div>
                  <span className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap  rounded ">
                    Settings
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-20 my-5 lg:w-auto">
          <ul className="lg:block">
            <li className="relative lg:mt-4 dropdown lg:dropup">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img
                  src={user.profilePhoto}
                  alt=""
                  className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 "
                />
              </button>

              {isDropdownOpen && (
                <ul className="absolute  -top-32 mb-2 w-48 bg-white  border border-gray-200  rounded-lg shadow-lg z-50">
                  <li>
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
                      to="#"
                      onClick={() => onMenuClick("profile")}
                    >
                      Profile
                      <i className="text-gray-500 float-right ri-profile-line text-16"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
                      to="#"
                      onClick={() => onMenuClick("settings")}
                    >
                      Settings
                      <i className="text-gray-500 float-right ri-settings-3-line text-16"></i>
                    </Link>
                  </li>

                  <li className="border-t border-gray-200 0"></li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 "
                      to="#"
                    >
                      Log out
                      <i className="text-gray-500 float-right ri-logout-circle-r-line text-16"></i>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Asidemenu;
