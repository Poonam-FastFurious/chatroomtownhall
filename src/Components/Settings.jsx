import { useEffect, useState } from "react";
import { Baseurl } from "../Config";
import Cookies from "js-cookie";
function Settings() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [openSection, setOpenSection] = useState(null);
  const [user, setUser] = useState({});
  const Id = Cookies.get("userId");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const [isLastSeenEnabled, setIsLastSeenEnabled] = useState(false);
  const [isprofileprivate, setIsprofileprivate] = useState(false);

  const handleToggleChange = () => {
    setIsLastSeenEnabled(!isLastSeenEnabled);
  };
  const handelprofileprivary = () => {
    setIsprofileprivate(!isprofileprivate);
  };

  useEffect(() => {
    fetch(`${Baseurl}/api/v1/user/currentuser?userId=${Id}`)
      .then((responce) => responce.json())
      .then((data) => setUser(data.data));
  }, [Id]);
  const updateProfilePhoto = () => {
    if (profilePhoto && Id) {
      const formData = new FormData();
      formData.append("userId", Id);
      formData.append("profilePhoto", profilePhoto);

      fetch(`${Baseurl}/api/v1/user/profilephoto`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Handle successful response (e.g., update state or notify user)
            alert("Profile photo updated successfully!");
          } else {
            // Handle error response
            alert("Failed to update profile photo.");
          }
        })
        .catch((error) => {
          // Handle fetch error
          console.error("Error:", error);
          alert("An error occurred while updating profile photo.");
        });
    } else {
      alert("Please select a profile photo.");
    }
  };

  const profileImageUrl = user.profilePhoto
    ? `${Baseurl}${user.profilePhoto}`
    : "https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-1.jpg";

  return (
    <>
      <div className="tab-content">
        <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
          <div className="px-6 pt-6">
            <h4 className="mb-0 text-gray-700 dark:text-gray-50">Settings</h4>
          </div>

          <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-500">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="hidden"
              id="profilePhotoInput"
            />

            <div className="relative mb-4">
              <img
                src={profileImageUrl}
                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                alt="Profile"
                onClick={() =>
                  document.getElementById("profilePhotoInput").click()
                }
              />
              <a
                href="#!"
                className="absolute bottom-0 w-10 h-10 bg-gray-100 rounded-full ltr:right-28 rtl:left-28 dark:bg-zinc-800 dark:text-gray-100"
                onClick={() =>
                  document.getElementById("profilePhotoInput").click()
                }
              >
                <i className="leading-10 ri-pencil-fill text-16"></i>
              </a>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="hidden"
              id="profilePhotoInput"
            />
            <button
              type="button"
              onClick={updateProfilePhoto}
              className="btn bg-[#B08D57] text-white mt-4"
            >
              Update Profile
            </button>

            <h5 className="mb-1 text-16 dark:text-gray-50">
              {" "}
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
                      openSection === "personalInfo"
                        ? "active dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                        : ""
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
                  className={`block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600 ${
                    openSection === "personalInfo" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div>
                      <div className="ltr:float-right rtl:float-left">
                        {/* <button
                          type="button"
                          className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50"
                        >
                          <i className="mr-1 align-middle ri-edit-fill"></i>{" "}
                          Edit
                        </button> */}
                      </div>
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Name
                      </p>
                      <h5 className="text-sm dark:text-gray-50">
                        {user.firstName} {user.lastName}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Email
                      </p>
                      <h5 className="text-sm dark:text-gray-50">
                        {user.emailAddress}
                      </h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Time
                      </p>
                      <h5 className="text-sm dark:text-gray-50">11:40 AM</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Location
                      </p>
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
                      openSection === "privacy"
                        ? "active dark:bg-zinc-600 dark:text-gray-50 dark:border-zinc-600"
                        : ""
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
                  className={`bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600 ${
                    openSection === "privacy" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                      <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
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
                                checked={isprofileprivate}
                                onChange={handelprofileprivary}
                              />
                              <span
                                className={`block w-8 h-5 rounded-full ${
                                  isprofileprivate
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              ></span>
                              <span
                                className={`absolute w-3 h-3 transition rounded-full ${
                                  isprofileprivate
                                    ? "bg-white translate-x-3"
                                    : "bg-gray-400"
                                } left-1 top-1`}
                              ></span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                      <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
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
                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                      <div className="flex items-center">
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                            Status
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50 "
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonT"
                          >
                            Everyone <i className="mdi mdi-chevron-down"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                            aria-labelledby="dropdownMenuButtonT"
                          >
                            <li>
                              <a
                                className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                href="#"
                              >
                                Everyone
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                href="#"
                              >
                                selected
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                href="#"
                              >
                                Nobody
                              </a>
                            </li>
                          </ul>
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
                      openSection === "help"
                        ? "active dark:bg-zinc-600 dark:text-gray-50 dark:border-zinc-600"
                        : ""
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
                  className={`bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600 ${
                    openSection === "help" ? "" : "hidden"
                  }`}
                >
                  <div className="p-5">
                    <div className="py-3">
                      <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                        <a href="#" className="block text-body">
                          FAQs
                        </a>
                      </h5>
                    </div>
                    <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                      <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                        <a href="#" className="text-body d-block">
                          Contact
                        </a>
                      </h5>
                    </div>
                    <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                      <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
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
