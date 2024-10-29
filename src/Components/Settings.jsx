/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { Baseurl } from "../Confige";
import axios from "axios";
import Swal from "sweetalert2";
function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const Id = Cookies.get("userId");

  const [isProfilePrivate, setIsProfilePrivate] = useState(false);

  //update profile

  const [formData, setFormData] = useState({
    userId: Id || "", // This should be set to the current user's ID
    displayName: "",
    skill: "",
    linkedinProfile: "",
    honoursAndCertifications: "",
    about: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        Baseurl + "/api/v1/townhalluser/Update",
        formData
      );
      alert(response.data.message); // Display success message
      toggleModal(); // Close the modal
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!"); // Handle error
    }
  };

  //update profile end
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    fetch(`${Baseurl}/api/v1/townhalluser/townhall?userId=${Id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data);
        setIsProfilePrivate(data.data.isPublic);
      });
  }, [Id, refresh]);

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
  const handleTogglePrivacy = () => {
    const newPrivacyStatus = !isProfilePrivate;
    setIsProfilePrivate(newPrivacyStatus);
    // Optionally, make a request to update the privacy status in your database
    updateProfilePrivacy(newPrivacyStatus);
  };
  const updateProfilePrivacy = async (isPublic) => {
    try {
      await axios.patch(Baseurl + "/api/v1/townhalluser/privacy", {
        userId: Id,
        isPublic: !isPublic, // Send the opposite value
      });
      Swal.fire({
        icon: "Success",
        title: "Updated",
        text: "Profile privacy updated successfully!",
      });
    } catch (error) {
      alert("Failed to update profile privacy.");
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
                src={user?.userId?.profilePhoto || "path/to/defaultImage.jpg"}
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
            <h5 className="mb-1 text-16 ">{user.displayName}</h5>
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
                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>{" "}
                    <i
                      className="leading-10 ri-pencil-fill text-16"
                      onClick={toggleModal}
                    ></i>
                  </button>
                </h2>

                <div
                  className={`block bg-white border border-t-0 border-gray-100 accordion-body   ${
                    openSection === "personalInfo" ? "" : "hidden"
                  }`}
                >
                  <div
                    className={`block bg-white border border-t-0 border-gray-100 accordion-body   ${
                      openSection === "personalInfo" ? "" : "hidden"
                    }`}
                  >
                    <div className="p-5">
                      <div>
                        <div className="ltr:float-right rtl:float-left"></div>
                        <p className="mb-1 text-gray-500 ">Display Name</p>
                        <h5 className="text-sm ">{user.displayName}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Email</p>
                        <h5 className="text-sm ">{user?.email}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Time</p>
                        <h5 className="text-sm ">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Gender</p>
                        <h5 className="text-sm ">{user?.gender}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Skills</p>
                        <h5 className="text-sm ">{user.skill}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Linkedin Profile</p>
                        <h5 className="text-sm ">{user?.linkedinProfile}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">
                          Honours & Certifications
                        </p>
                        <h5 className="text-sm ">
                          {user?.honoursAndCertifications}
                        </h5>
                      </div>
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
                                checked={isProfilePrivate} // Reflect the actual public/private status
                                onChange={handleTogglePrivacy}
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
      {isOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex items-center pb-3 border-gray-300">
              <h3 className="text-gray-800 text-xl font-bold flex-1">
                Edit Profile
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
                {[
                  {
                    label: "Display Name",
                    name: "displayName",
                    placeholder: "Enter Display Name",
                  },
                  { label: "Skill", name: "skill", placeholder: "Enter Skill" },
                  { label: "Email", name: "email", placeholder: "Enter Email" },
                  {
                    label: "LinkedIn Profile",
                    name: "linkedinProfile",
                    placeholder: "Enter LinkedIn Profile",
                  },
                  {
                    label: "Honours & Certifications",
                    name: "honoursAndCertifications",
                    placeholder: "Enter Honours & Certifications",
                  },
                  { label: "About", name: "about", placeholder: "Enter About" },
                ].map((field) => (
                  <div key={field.name} className="mb-8">
                    <label className="block mb-2 ltr:text-left rtl:text-right">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      type="text"
                      className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </form>
            </div>
            <div className="border-gray-300 pt-6 flex justify-end gap-4">
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
                className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-[#CA9352]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
