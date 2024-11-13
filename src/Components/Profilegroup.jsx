/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState } from "react";

function Profilegroup({ onClose, groupData }) {
  const [openSection, setOpenSection] = useState(null);
  const [openAbout, setOpenAbout] = useState(null);
  console.log("groupinfo", groupData);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleAbout = (section) => {
    setOpenAbout(openAbout === section ? null : section);
  };

  const { groupName, totalMembers, admin, users } = groupData || {};

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
                src={
                  admin?.profilePhoto ||
                  "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                }
                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                alt="Admin Profile"
              />
            </div>

            <h5 className="mb-1 text-16 ">
              {admin?.firstName} {admin?.lastName}
            </h5>
            <p>{groupName}</p>
          </div>

          {/* About Section */}
          <div className="text-gray-700 accordion-item">
            <h2>
              <button
                onClick={() => toggleAbout("AboutSection")}
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
                openAbout === "AboutSection" ? "" : "hidden"
              }`}
            >
              <div className="p-5">
                <div>
                  <p className="mb-1 text-gray-500 dark:text-gray-300">
                    Group Name
                  </p>
                  <h5 className="text-sm dark:text-gray-50">
                    {groupName || "Not available"}
                  </h5>
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">
                    Total Members
                  </p>
                  <h5 className="text-sm dark:text-gray-50">
                    {totalMembers || "0"}
                  </h5>
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">
                    Admin Email
                  </p>
                  <h5 className="text-sm dark:text-gray-50">
                    {admin?.emailAddress || "Not available"}
                  </h5>
                </div>
                <div className="mt-5">
                  <p className="mb-1 text-gray-500 dark:text-gray-300">
                    Admin Location
                  </p>
                  <h5 className="text-sm dark:text-gray-50">
                    {admin?.address || "Not available"}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Members List */}
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
                      Members List
                    </span>

                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                  </button>
                </h2>
                <div
                  className={`block bg-white border border-t-0 border-gray-100 accordion-body ${
                    openSection === "membersList" ? "" : "hidden"
                  }`}
                  style={{ maxHeight: "40vh", overflowY: "auto" }}
                >
                  <div className="p-5">
                    {users && users.length > 0 ? (
                      users.map((user, index) => (
                        <div
                          key={index}
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
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No members found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Details */}
              <div className="p-5 mt-4 border-t-2 border-gray-100">
                <h5 className="font-semibold text-sm text-gray-700">
                  Admin Details
                </h5>
                <div className="flex items-center mt-2">
                  <img
                    src={
                      admin?.profilePhoto ||
                      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                    }
                    alt="Admin"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h6 className="text-sm font-semibold">
                      {admin?.displayName} 
                    </h6>
                   
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

export default Profilegroup;
