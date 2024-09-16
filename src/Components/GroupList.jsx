import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../Confige";

function GruopList() {
  const [group, setGroup] = useState([]);
  const [allgroup, setAllgroup] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isaddmemberopen, setIsaddmemberopen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showAllGroups, setShowAllGroups] = useState(false); // New state for toggling between group and all group

  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdownIndex(index); // Open the clicked dropdown
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const addmemberopen = () => {
    setIsaddmemberopen(!isaddmemberopen);
  };
  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };
  const fetchallgroup = async () => {
    try {
      const token = Cookies.get("accessToken");

      // Fetch chats from the API
      const response = await fetch(Baseurl + "/api/v1/chat/getallgroups", {
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

      setAllgroup(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
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
  useEffect(() => {
    fetchChats();
    fetchallgroup();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("accessToken");

        // Fetch users from the API
        const response = await fetch(Baseurl + "/api/v1/user/alluser", {
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
        setUserList(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleGroupNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };
  const handleEditGroup = (group) => {
    setSelectedGroupId(group._id);
    setName(group.chatName);
    toggleEditModal();
  };
  const handelmemberadd = (group) => {
    setSelectedGroupId(group._id);
    addmemberopen();
  };
  const handleEditSave = async () => {
    if (!name) {
      alert("Please enter a group name.");
      return;
    }

    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(Baseurl + `/api/v1/chat/renamegroup`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId: selectedGroupId, chatName: name }), // Include chatId in the request body
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Group updated successfully:", result);
        toggleEditModal(); // Close the modal on success
        fetchChats();
        setName(""); // Refresh the chat list after the update
      } else {
        console.error("Error updating group:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSave = async () => {
    const userId = Cookies.get("userId");

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
          users: JSON.stringify(finalSelectedUsers), // Convert array to JSON string
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Group created successfully:", result);
        toggleModal(); // Close the modal on success
        fetchChats();
      } else {
        console.error("Error creating group:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const handleAddMemberSave = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to add to the group.");
      return;
    }

    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(Baseurl + "/api/v1/chat/groupadduser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: selectedGroupId, // ID of the group
          userId: selectedUsers, // Send the array of user IDs
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Member(s) added successfully:", result);
        setIsaddmemberopen(false); // Close the modal on success
        fetchChats(); // Refresh the group list after adding members
      } else {
        console.error("Error adding members:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const filteredGroups = group.filter((g) =>
    g.chatName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAllGroups = allgroup.filter((g) =>
    g.chatName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = userList.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="chat-leftsidebar lg:w-[380px] overflow-hidden shadow mb-[80px] lg:mb-0 bg-gray-200  h-[100vh] overflow-y-auto">
          <div className="p-6">
            <section className=" pt-2 lg:pb-2 lg:pt-[10px] ">
              <div className="container">
                <div className=" flex  ">
                  <div className="inline-flex items-center overflow-hidden  gap-4   ">
                    <button
                      className="border-r border-stroke px-4 py-3 shadow-lg rounded-md last-of-type:border-r-0 hover:bg-gray-200 bg-[#CA9352]"
                      onClick={toggleModal}
                    >
                      <i className="ri-group-line me-1 ms-0"></i>
                      Create Groups
                    </button>
                  </div>
                  <div className="inline-flex items-center overflow-hidden  gap-4   ">
                    <button
                      className="border-r border-stroke px-4 py-3 shadow-lg rounded-md last-of-type:border-r-0 hover:bg-gray-200 bg-[#CA9352]"
                      onClick={() => setShowAllGroups(true)}
                    >
                      <i className="ri-group-line me-1 ms-0"></i>
                      all Groups
                    </button>
                  </div>
                </div>
              </div>
            </section>

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
                        <label className="block mb-2 ltr:text-left  rtl:text-right">
                          Group Name
                        </label>
                        <input
                          value={name}
                          onChange={handleGroupNameChange}
                          type="text"
                          className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0  "
                          id="addgroupname-input"
                          placeholder="Enter Group Name"
                        />
                      </div>
                      <div className="mb-8 ltr:text-left rtl:text-right">
                        <label className="block mb-2 ltr:text-left  rtl:text-right">
                          Search User
                        </label>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 "
                          id="user-search-input"
                          placeholder="Search users"
                        />
                        {searchTerm && (
                          <div className="mb-8">
                            <ul>
                              {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                  <li
                                    key={user._id}
                                    onClick={() => handleUserSelect(user._id)}
                                    className={`p-2 cursor-pointer rounded hover:bg-gray-400 mt-4 ${
                                      selectedUsers.includes(user._id)
                                        ? "bg-[#CA9352]"
                                        : ""
                                    }`}
                                  >
                                    {user.firstName}
                                  </li>
                                ))
                              ) : (
                                <li>No users found</li>
                              )}
                            </ul>
                          </div>
                        )}
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
                      className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#CA9352] "
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isEditOpen && (
              <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                  <div className="flex items-center pb-3  border-gray-300">
                    <h3 className="text-gray-800 text-xl font-bold flex-1">
                      Edit Group
                    </h3>
                    <svg
                      onClick={toggleEditModal}
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
                        <label className="block mb-2 ltr:text-left  rtl:text-right">
                          Group Name
                        </label>
                        <input
                          value={name}
                          onChange={handleGroupNameChange}
                          type="text"
                          className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0  "
                          id="editgroupname-input"
                          placeholder="Enter Group Name"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={handleEditSave}
                          type="button"
                          className="px-4 py-2 text-white bg-[#CA9352] rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={toggleEditModal}
                          type="button"
                          className="px-4 py-2 text-gray-500 bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {isaddmemberopen && (
              <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                  <div className="flex items-center pb-3 border-gray-300">
                    <h3 className="text-gray-800 text-xl font-bold flex-1">
                      Add Members
                    </h3>
                    <svg
                      onClick={addmemberopen}
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
                      <div className="mb-8 ltr:text-left rtl:text-right">
                        <label className="block mb-2">Search User</label>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0"
                          placeholder="Search users"
                        />
                        {searchTerm && (
                          <div className="mb-8">
                            <ul>
                              {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                  <li
                                    key={user._id}
                                    onClick={() => handleUserSelect(user._id)}
                                    className={`p-2 cursor-pointer rounded hover:bg-gray-400 mt-4 ${
                                      selectedUsers.includes(user._id)
                                        ? "bg-[#CA9352]"
                                        : ""
                                    }`}
                                  >
                                    {user.firstName}
                                  </li>
                                ))
                              ) : (
                                <li>No users found</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="border-gray-300 pt-6 flex justify-end gap-4">
                    <button
                      onClick={addmemberopen}
                      type="button"
                      className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleAddMemberSave}
                      className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#CA9352]"
                    >
                      Add Members
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="  ml-4 py-1 mt-5 mb-5 rounded bg-slate-100   ">
              <span className="bg-slate-100   pe-1 ps-3 " id="basic-addon2">
                <i className="text-lg text-gray-700 ri-search-line search-icon "></i>
              </span>
              <input
                type="text"
                className="border-0 bg-slate-100    placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 "
                placeholder="Search messages or users"
                aria-label="Search messages or users"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div
              className="chat-message-list chat-group-list"
              data-simplebar=""
            >
              <ul className="px-5 py-[15px] transition-all ease-in-out rounded gap-4">
                {filteredGroups.map((chat, index) => (
                  <li
                    key={index}
                    className="mb-2 px-5 py-[15px] hover:bg-[#CA9352] hover:/50    bg-gray-300   text-white transition-all ease-in-out rounded"
                  >
                    <Link to="#">
                      <div className="flex items-center">
                        <div className="">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 bg-violet-500/20 0/20 ">
                            <span className="font-medium text-violet-500 ">
                              {chat.profileImage ? (
                                <img
                                  src={chat.profileImage}
                                  alt="Profile"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <span className="font-medium text-violet-500 group-data-[theme-color=red]:text-red-500">
                                  {chat.chatName[0].toUpperCase()}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14  ml-4">
                            {chat.chatName}
                            {/* <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                              +23
                            </span> */}
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            onClick={() => toggleDropdown(index)}
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          {openDropdownIndex === index && (
                            <ul
                              className="absolute -left-8 z-50 block w-40  text-left list-none bg-white border border-transparent rounded shadow-lg"
                              aria-labelledby="dropdownMenuButtonB"
                            >
                              <li>
                                <Link
                                  onClick={() => handelmemberadd(chat)}
                                  className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 "
                                  to="#"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  onClick={() => handleEditGroup(chat)}
                                  className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 "
                                  to="#"
                                >
                                  Rename
                                </Link>
                              </li>
                              {/* <li>
                                <Link
                                  className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 "
                                  to="#"
                                >
                                  Req
                                </Link>
                              </li> */}
                            </ul>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="chat-message-list chat-group-list"
              data-simplebar=""
            >
              <ul className="px-5 py-[15px] transition-all ease-in-out rounded gap-4">
                {showAllGroups &&
                  filteredAllGroups.map((chat, index) => (
                    <li
                      key={index}
                      className="mb-2 px-5 py-[15px] hover:bg-[#CA9352] hover:/50    bg-gray-300   text-white transition-all ease-in-out rounded"
                    >
                      <Link to="#">
                        <div className="flex items-center">
                          <div className="">
                            <div className="flex items-center justify-center rounded-full w-9 h-9 bg-violet-500/20 0/20 ">
                              <span className="font-medium text-violet-500 ">
                                {chat.profileImage ? (
                                  <img
                                    src={chat.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <span className="font-medium text-violet-500 group-data-[theme-color=red]:text-red-500">
                                    {chat.chatName[0].toUpperCase()}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-14  ml-4">
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
