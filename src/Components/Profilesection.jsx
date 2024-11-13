import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Baseurl } from "../Confige";
function Profilesection() {
  const [user, setUser] = useState({});
  const [openSection, setOpenSection] = useState("personalInfo");
  const Id = Cookies.get("userId");
  useEffect(() => {
    fetch(`${Baseurl}/api/v1/townhalluser/townhall?userId=${Id}`)
      .then((responce) => responce.json())
      .then((data) => setUser(data.data));
  }, [Id]);
  console.log("newdisplaya", user);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <>
      <div className="chat-leftsidebar lg:w-[380px]   overflow-y-auto h-100% shadow  mb-[80px] lg:mb-0 bg-gray-200">
        <div>
          <div className="tab-content active">
            <div>
              <div className="px-6 pt-6">
                <div className="ltr:float-right rtl:float-left"></div>
                <h4 className="mb-0 text-gray-700 ">My Profile</h4>
              </div>

              <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
                <div className="mb-4">
                  <img
                    src={
                      user?.userId?.profilePhoto || "path/to/defaultImage.jpg"
                    }
                    className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                    alt=""
                  />
                </div>

                <h5 className="mb-1 text-16 text-gray-500 ">
                  {user.displayName}
                </h5>

                <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
                  <a href="#" className="text-gray-500 ">
                    {user?.userId?.Active && (
                      <span>
                        Active{" "}
                        <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10"></i>
                      </span>
                    )}
                  </a>
                </h5>
              </div>

              <div className="p-6 h-[550px]" data-simplebar="">
                <div className="text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className={`flex items-center  justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group ${
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
                        <p className="mb-1 text-gray-500 ">Display Name</p>
                        <h5 className="text-sm ">{user.displayName}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Email</p>
                        <h5 className="text-sm ">
                          {user?.email}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Time</p>
                        <h5 className="text-sm ">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Gender</p>
                        <h5 className="text-sm ">{user?.userId?.gender}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Skills</p>
                        <h5 className="text-sm ">{user?.userId?.skills[0]}</h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">Linkedin Profile</p>
                        <h5 className="text-sm ">
                          {user?.userId?.linkedinProfile}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 ">
                          Honours & Certifications
                        </p>
                        <h5 className="text-sm ">
                          {user?.userId?.honoursAndCertifications[0]}
                        </h5>
                      </div>
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

export default Profilesection;
