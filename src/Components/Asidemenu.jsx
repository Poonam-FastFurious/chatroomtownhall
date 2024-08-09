/* eslint-disable react/prop-types */
// Asidemenu.js

import { Link } from "react-router-dom";

const Asidemenu = ({ onMenuClick }) => {
  return (
    <>
      <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white dark:bg-zinc-600">
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
                className="tab-button flex relative items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Profile
                  </span>
                </div>
                <i className="text-2xl ri-user-2-line"></i>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("chatlist")}
                className="tab-button active relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Chats
                  </span>
                </div>
                <i className="text-2xl ri-message-3-line"></i>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("groups")}
                className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Groups
                  </span>
                </div>
                <i className="text-2xl ri-group-line"></i>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("contacts")}
                className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Contacts
                  </span>
                </div>
                <i className="text-2xl ri-contacts-line"></i>
              </button>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <button
                onClick={() => onMenuClick("settings")}
                className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
              >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Settings
                  </span>
                </div>
                <i className="text-2xl ri-settings-2-line"></i>
              </button>
            </li>
          </ul>
        </div>

        <div className="w-20 my-5 lg:w-auto">
          <ul className="lg:block">
            <li className="relative lg:mt-4 dropdown lg:dropup">
              <button
                className="dropdown-toggle"
                id="dropdownButton2"
                data-bs-toggle="dropdown"
              >
                <img
                  src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-4.jpg"
                  alt=""
                  className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 dark:bg-zinc-700"
                />
              </button>

              <ul
                className="absolute z-40 hidden float-left w-40 py-2 mx-4 mb-12 text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu bg-clip-padding dark:bg-zinc-700"
                aria-labelledby="dropdownButton2"
              >
                <li>
                  <Link
                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                    to="#"
                  >
                    Profile
                    <i className="text-gray-500 rtl:float-left ltr:float-right ri-profile-line text-16"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                    to="#"
                  >
                    Setting
                    <i className="text-gray-500 rtl:float-left ltr:float-right ri-settings-3-line text-16"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                    to="#"
                  >
                    Lock Screen
                    <i className="text-gray-500 rtl:float-left ltr:float-right ri-git-repository-private-line text-16"></i>
                  </Link>
                </li>
                <li className="my-2 border-b border-gray-100/20"></li>
                <li>
                  <Link
                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                    to="#"
                  >
                    Log out
                    <i className="text-gray-500 rtl:float-left ltr:float-right ri-logout-circle-r-line text-16"></i>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Asidemenu;
