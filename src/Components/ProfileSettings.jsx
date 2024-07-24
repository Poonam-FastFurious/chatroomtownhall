import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../Config";
function ProfileSettings() {
  const [user, setUser] = useState({});
  const Id = Cookies.get("userId");
  useEffect(() => {
    fetch(`${Baseurl}/api/v1/user/currentuser?userId=${Id}`)
      .then((responce) => responce.json())
      .then((data) => setUser(data.data));
  }, [Id]);
  return (
    <>
      <div className="user-profile-sidebar  h-[100vh] bg-gray-100 shadow overflow-y-hidden mb-[85px] lg:mb-0 d border-l-4 border-gray-50  -data-[theme-color=red]: absolute xl:relative top-0 bottom-0">
        <div className="px-6 pt-6">
          <div className="text-end">
            <button
              type="button"
              className="text-2xl text-gray-500 border-0 btn "
              id="user-profile-hide"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>

        <div className="p-6 text-center border-b border-gray-100 ">
          <div className="mb-4">
            <img
              src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-1.jpg"
              className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full "
              alt=""
            />
          </div>

          <h5 className="mb-1 text-16 ">
            {user.firstName} {user.lastName}
          </h5>
          <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
            <Link to="#" className="text-gray-500 ">
              <i className=" ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10  text-green-500 "></i>
              Active
            </Link>
          </h5>
        </div>

        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500 ">
              If several languages coalesce, the grammar of the resulting
              language is more simple and regular than that of the individual.
            </p>
          </div>

          <div data-tw-accordion="collapse">
            <div className="text-gray-700 accordion-item">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active   "
                >
                  <span className="m-0 text-[14px]  font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-user-2-line d-inline-block"></i>
                    About
                  </span>
                </button>
              </h2>

              <div className="block bg-white border border-t-0 border-gray-100 accordion-body  ">
                <div className="p-5">
                  <div>
                    <p className="mb-1 text-gray-500 ">Name</p>
                    <h5 className="text-sm ">
                      {" "}
                      {user.firstName} {user.lastName}
                    </h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 ">Email</p>
                    <h5 className="text-sm ">{user.emailAddress}</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 ">Time</p>
                    <h5 className="text-sm ">11:40 PM</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 ">Location</p>
                    <h5 className="text-sm ">{user.address}</h5>
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

export default ProfileSettings;
