import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { Baseurl } from "../Confige";
function Settings() {
  const [openSection, setOpenSection] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const Id = Cookies.get("userId");

  const [isLastSeenEnabled, setIsLastSeenEnabled] = useState(false);
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);

  useEffect(() => {
    fetch(`${Baseurl}/api/v1/user/currentuser?userId=${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
        setIsProfilePrivate(data.data.isProfilePrivate);
        setIsLastSeenEnabled(data.data.isLastSeenEnabled);
      });
  }, [Id, refresh]);

  const updateUserPrivacy = () => {
    fetch(`${Baseurl}/api/v1/user/privacy`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: Id,
        LastSeen: isLastSeenEnabled,
        ReadReceipt: isLastSeenEnabled,
        Status: user.Status,
        profilePhotoVisibility: isProfilePrivate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage("Privacy settings updated successfully!");
          setRefresh(!refresh);
        } else {
          alert("Failed to update privacy settings.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while updating privacy settings.");
      });
  };

  const handleToggleChange = () => {
    const newValue = !isLastSeenEnabled;
    setIsLastSeenEnabled(newValue);
    updateUserPrivacy("isLastSeenEnabled", newValue);
  };

  const handleProfilePrivacyChange = () => {
    const newValue = !isProfilePrivate;
    setIsProfilePrivate(newValue);
    updateUserPrivacy("isProfilePrivate", newValue);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const updateProfilePhoto = (file) => {
    if (file && Id) {
      const formData = new FormData();
      formData.append("userId", Id);
      formData.append("profilePhoto", file);

      fetch(`${Baseurl}/api/v1/user/profilephoto`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage("Profile photo updated successfully!");
            setUser((prevUser) => ({
              ...prevUser,
              profilePhoto: data.data.profilePhoto, // Assuming this is the correct field from the response
            }));
          } else {
            alert("Failed to update profile photo.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while updating profile photo.");
        });
    } else {
      alert("Please select a profile photo.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateProfilePhoto(file);
    }
  };
  return (
    <>
      <div className="tab-content active">
        <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
          <div className="px-6 pt-6">
            <h4 className="mb-0 text-gray-700 ">Settings</h4>
          </div>

          <div className="p-6 text-center border-b border-gray-100 ">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Handle file change event
              className="hidden"
              id="profilePhotoInput"
            />

            <div className="relative mb-4">
              <img
                src={user.profilePhoto}
                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full "
                alt="Profile"
                onClick={() =>
                  document.getElementById("profilePhotoInput").click()
                }
              />
              <a
                href="#!"
                className="absolute bottom-0 w-10 h-10 bg-gray-100 rounded-full ltr:right-28 rtl:left-28 "
                onClick={() =>
                  document.getElementById("profilePhotoInput").click()
                }
              >
                <i className="leading-10 ri-pencil-fill text-16"></i>
              </a>
            </div>
            <p>{successMessage}</p>
            <h5 className="mb-1 text-16 ">
              {user.firstName} {user.lastName}
            </h5>
          </div>

          <div className="p-6 h-[550px]" data-simplebar="">
            <div data-tw-accordion="collapse">
              <div className="text-gray-700 accordion-item">
                <h2>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group ${
                      openSection === "personalInfo" ? "active  " : ""
                    }`}
                    onClick={() => toggleSection("personalInfo")}
                  >
                    <span className="m-0 text-[14px] font-medium">
                      Personal Info
                    </span>
                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                  </button>
                </h2>

                <div
                  className={`block bg-white border border-t-0 border-gray-100 accordion-body   ${
                    openSection === "personalInfo" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div>
                      <div className="ltr:float-right rtl:float-left"></div>
                      <p className="mb-1 text-gray-500 ">Name</p>
                      <h5 className="text-sm ">
                        {user.firstName} {user.lastName}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 ">Email</p>
                      <h5 className="text-sm ">{user.emailAddress}</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 ">Time</p>
                      <h5 className="text-sm ">11:40 AM</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 ">Location</p>
                      <h5 className="text-sm ">{user.address}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-gray-700 accordion-item">
                <h2>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group ${
                      openSection === "privacy" ? "active   " : ""
                    }`}
                    onClick={() => toggleSection("privacy")}
                  >
                    <span className="m-0 text-[14px] font-semibold">
                      Privacy
                    </span>
                    <i
                      className={`mdi mdi-chevron-down text-lg ${
                        openSection === "privacy" ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                </h2>
                <div
                  className={`bg-white border border-t-0 border-gray-100 accordion-body   ${
                    openSection === "privacy" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div className="py-4 border-t border-gray-100/80 ">
                      <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-13 ">
                            Profile privacy
                          </h5>
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="toggleSwitch"
                            className="flex items-center cursor-pointer"
                          >
                            <span className="relative">
                              <input
                                type="checkbox"
                                id="toggleSwitch"
                                className="sr-only"
                                checked={isProfilePrivate}
                                onChange={handleProfilePrivacyChange}
                              />
                              <span
                                className={`block w-8 h-5 rounded-full ${
                                  isProfilePrivate
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              ></span>
                              <span
                                className={`absolute w-3 h-3 transition rounded-full ${
                                  isProfilePrivate
                                    ? "bg-white translate-x-3"
                                    : "bg-gray-400"
                                } left-1 top-1`}
                              ></span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 border-t border-gray-100/80 ">
                      <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-13 ">
                            Read receipts
                          </h5>
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor="toggleSwitchread"
                            className="flex items-center cursor-pointer"
                          >
                            <span className="relative">
                              <input
                                type="checkbox"
                                id="toggleSwitchread"
                                className="sr-only"
                                checked={isLastSeenEnabled}
                                onChange={handleToggleChange}
                              />
                              <span
                                className={`block w-8 h-5 rounded-full ${
                                  isLastSeenEnabled
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              ></span>
                              <span
                                className={`absolute w-3 h-3 transition rounded-full ${
                                  isLastSeenEnabled
                                    ? "bg-white translate-x-3"
                                    : "bg-gray-400"
                                } left-1 top-1`}
                              ></span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-gray-700 accordion-item">
                <h2>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group ${
                      openSection === "help" ? "active " : ""
                    }`}
                    onClick={() => toggleSection("help")}
                  >
                    <span className="m-0 text-[14px] font-medium">Help</span>
                    <i
                      className={`mdi mdi-chevron-down text-lg ${
                        openSection === "help" ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                </h2>
                <div
                  className={`bg-white border border-t-0 border-gray-100 accordion-body   ${
                    openSection === "help" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div className="py-3">
                      <h5 className="mb-0 text-gray-700 text-13 ">
                        <a href="#" className="block text-body">
                          FAQs
                        </a>
                      </h5>
                    </div>
                    <div className="py-3 border-t border-gray-100 ">
                      <h5 className="mb-0 text-gray-700 text-13 ">
                        <a href="#" className="text-body d-block">
                          Contact
                        </a>
                      </h5>
                    </div>
                    <div className="py-3 border-t border-gray-100 ">
                      <h5 className="mb-0 text-gray-700 text-13 ">
                        <a href="#" className="text-body d-block">
                          Terms & Privacy policy
                        </a>
                      </h5>
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

export default Settings;
