import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../Config";
function GruopList() {
  const [group, setGroup] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = Cookies.get("accessToken");

        // Fetch chats from the API
        const response = await fetch(Baseurl + "/api/v1/chat/getallchat", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Filter groups only
        const groupChats = data.filter((chat) => chat.isGroupChat);

        setGroup(groupChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);
  const handleGroupNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUserSelection = (event) => {
    const userId = event.target.value;
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSave = async () => {
    // Ensure the user ID is fetched from local storage
    const userId = localStorage.getItem("userId");

    // Include the user's ID in the selected users list if not already present
    const finalSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers
      : [...selectedUsers, userId];

    if (finalSelectedUsers.length < 2) {
      alert("Please select at least two users to create a group.");
      return;
    }

    const token = Cookies.get("accessToken");
    try {
      const response = await fetch(Baseurl + "/api/v1/chat/groupcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          users: finalSelectedUsers,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Group created successfully:", result);
        toggleModal(); // Close the modal on success
      } else {
        console.error("Error creating group:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="tab-content">
        <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
          <div className="p-6">
            <div className="ltr:float-right rtl:float-left">
              <div className="relative">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300"
                >
                  <i className="ri-group-line me-1 ms-0"></i>
                </button>
              </div>
            </div>
            <h4 className="mb-6 dark:text-gray-50">Groups</h4>

            {isOpen && (
              <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                  <div className="flex items-center pb-3  border-gray-300">
                    <h3 className="text-gray-800 text-xl font-bold flex-1">
                      Create Group
                    </h3>
                    <svg
                      onClick={toggleModal}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                      viewBox="0 0 320.591 320.591"
                    >
                      <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div className="py-4">
                    <form>
                      <div className="mb-8">
                        <label className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">
                          Group Name
                        </label>
                        <input
                          value={name}
                          onChange={handleGroupNameChange}
                          type="text"
                          className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 "
                          id="addgroupname-input"
                          placeholder="Enter Group Name"
                        />
                      </div>
                      <div className="mb-8 ltr:text-left rtl:text-right">
                        <label className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">
                          Select User
                        </label>
                        <select
                          onChange={handleUserSelection}
                          multiple
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
                        >
                          <option selected>Choose a User</option>
                          <option value="6698def43190b73fc820dff7">
                            admin
                          </option>
                          <option value="6698dd2e3190b73fc820dff1">Raju</option>
                          <option value="6698cf0ac1e7c59eb35eeb38">
                            Rahul
                          </option>
                          <option value="66977c0ea0ccf009115dd86a">Ram</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className=" border-gray-300 pt-6 flex justify-end gap-4">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="py-1 mt-5 mb-5 rounded bg-slate-100  group-data-[theme-color=red]:bg-red-50   group-data-[theme-color=red]:">
              <span
                className="bg-slate-100  group-data-[theme-color=red]:bg-red-50   group-data-[theme-color=red]: pe-1 ps-3 "
                id="basic-addon2"
              >
                <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
              </span>
              <input
                type="text"
                className="border-0 bg-slate-100  group-data-[theme-color=red]:bg-red-50   group-data-[theme-color=red]: placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400"
                placeholder="Search messages or users"
                aria-label="Search messages or users"
                aria-describedby="basic-addon2"
              />
            </div>

            <div
              className="chat-message-list chat-group-list"
              data-simplebar=""
            >
              <ul>
                {group.map((chat, index) => (
                  <li
                    key={index}
                    className="px-5 py-[15px] hover:bg-slate-100 hover:/50 group-data-[theme-color=red]:hover:bg-red-50/50   group-data-[theme-color=red]: transition-all ease-in-out rounded"
                  >
                    <Link to="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 bg-violet-500/20 0/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium text-violet-500  group-data-[theme-color=red]:text-red-500">
                              R
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50 ml-4">
                            {chat.chatName}
                            {/* <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                              +23
                            </span> */}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GruopList;
