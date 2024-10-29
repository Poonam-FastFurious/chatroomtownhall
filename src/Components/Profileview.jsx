/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Baseurl } from "../Confige";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
function Profileview({ chatId, onClose }) {
  const [openSection, setOpenSection] = useState(null);
  const [openAbout, setOpenAbout] = useState(null);
  const [users, setUsers] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [admin, setAdmin] = useState(null);
  const userId = Cookies.get("userId");
  const [otherUser, setOtherUser] = useState(null);
  useEffect(() => {
    const token = Cookies.get("accessToken");

    fetch(`${Baseurl}/api/v1/chat/getsingle?chatId=${chatId}`, {
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
        if (data) {
          setIsGroupChat(data.isGroupChat);
          setChatName(data.chatName);
          setAdminId(data.groupAdmin?._id);
          setAdmin(data.groupAdmin);
          if (Array.isArray(data.users)) {
            setUsers(data.users);
            if (!data.isGroupChat) {
              // Set other user (the one who is not the current user)
              const otherUserData = data.users.find(
                (user) => user._id !== userId
              );
              setOtherUser(otherUserData);
            }
          } else {
            setUsers([]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [chatId]);

  // Determine the name to display
  const displayName = isGroupChat ? chatName : otherUser?.displayName || "User";
  const Skill = isGroupChat ? chatName : otherUser?.skills || "no skill";
  const certificate = isGroupChat ? chatName : otherUser?.honoursAndCertifications || "no skill";
  const email = isGroupChat
    ? "Not available"
    : otherUser?.emailAddress || "Not available";

  // Get the profile image or use a default avatar
  const profileImage = isGroupChat
    ? "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg" // Default group avatar image
    : users.find((user) => user._id !== userId)?.profilePhoto ||
      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
  const removeUser = (removeUserId) => {
    if (userId !== adminId) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied",
        text: "You do not have permission to remove users.",
      });
      return;
    }

    const token = Cookies.get("accessToken");

    fetch(`${Baseurl}/api/v1/chat/groupremoveuser`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        userId: removeUserId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove user from group");
        }
        return response.json();
      })
      .then(() => {
        // Update the users state to reflect the removal
        setUsers(users.filter((user) => user._id !== removeUserId));
      })
      .catch((error) => {
        console.error("Error removing user:", error);
      });
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const toggleabout = (section) => {
    setOpenAbout(openAbout === section ? null : section);
  };

  return (
    <>
      <div>
        <div className="user-profile-sidebar h-[100vh] bg-white shadow overflow-y-hidden mb-[85px] lg:mb-0  border-l-4 border-gray-50  absolute xl:relative profile-view-mobile">
          <div className="px-6 pt-6 profile-content">
            <div className="text-end">
              <button
                type="button"
                className="text-2xl text-gray-500 border-0 btn dark:text-gray-200"
                id="user-profile-hide"
                onClick={onClose}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>

          <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
            <div className="mb-4">
              <img
                src={profileImage}
                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                alt="Profile"
              />
            </div>

            <h5 className="mb-1 text-16 ">{displayName}</h5>
          </div>
          <div className="text-gray-700 accordion-item">
            <h2>
              <button
                onClick={() => toggleabout("Aboutsection")}
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
              >
                <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                  <i className="mr-2 align-middle ri-user-2-line d-inline-block"></i>
                  About
                </span>

                <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50"></i>
              </button>
            </h2>

            <div
              className={`block bg-white border border-t-0 border-gray-100 accordion-body ${
                openAbout === "Aboutsection" ? "" : "hidden"
              }`}
            >
              <div className="p-5">
                <div>
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Name</p>
                  <h5 className="text-sm dark:text-gray-50">{displayName}</h5>
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Email</p>
                  {email}
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Skill</p>
                  {Skill}
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Honours & Certifications</p>
                  {certificate}
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Time</p>
                  <h5 className="text-sm dark:text-gray-50">
                    {users.find((user) => user._id !== userId)?.lastActive
                      ? new Date(
                          users.find((user) => user._id !== userId)?.lastActive
                        ).toLocaleString()
                      : "Not available"}
                  </h5>
                </div>
                {/* <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">
                    Location
                  </p>
                  <h5 className="text-sm dark:text-gray-50">
                    {users.find((user) => user._id !== userId)?.address ||
                      "Not available"}
                  </h5>
                </div> */}
              </div>
            </div>
          </div>
          {isGroupChat && (
            <div className=" h-[550px]" data-simplebar="">
              <div data-tw-accordion="collapse">
                <div className="mt-2 text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group"
                      onClick={() => toggleSection("membersList")}
                    >
                      <span className="m-0 text-[14px] font-semibold ltr:block rtl:hidden">
                        <i className="mr-2 align-middle ri-attachment-line d-inline-block"></i>
                        Members list
                      </span>

                      <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                    </button>
                  </h2>
                  <div
                    className={`"block bg-white border border-t-0 border-gray-100 accordion-body ${
                      openSection === "membersList" ? "" : "hidden"
                    }`}
                    style={{ maxHeight: "40vh", overflowY: "auto" }}
                  >
                    <div className="p-5">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <div
                            key={user._id}
                            className="p-2 mb-2 border rounded border-gray-100/80 "
                          >
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 rounded  ">
                                <img
                                  src={
                                    user.profilePhoto ||
                                    "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                                  }
                                  alt={user.firstName}
                                  className="w-10 h-10 rounded-full"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="text-start">
                                  <h5 className="mb-1 text-sm ml-4">
                                    {user.displayName}
                                  </h5>
                                  {/* <p className="mb-0 text-gray-500 text-13 dark:text-gray-300 ml-4">
                                    {user.emailAddress}
                                  </p> */}
                                </div>
                              </div>
                              <div>
                                <i
                                  className="ri-close-line cursor-pointer"
                                  onClick={() => removeUser(user._id)}
                                ></i>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No users found</p>
                      )}
                    </div>
                  </div>
                </div>
                {admin && (
                  <div className="p-5 mt-4 border-t-2 border-gray-100">
                    <h5 className="font-semibold text-sm text-gray-700">
                      Admin Details
                    </h5>
                    <div className="flex items-center mt-2">
                      <img
                        src={
                          admin.profilePhoto ||
                          "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                        }
                        alt="Admin"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <h6 className="text-sm font-semibold">
                          {admin.firstName} {admin.lastName}
                        </h6>
                        <p className="text-gray-500 text-xs">
                          {admin.emailAddress || "No email provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profileview;
