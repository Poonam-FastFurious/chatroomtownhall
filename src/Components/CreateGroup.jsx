function CreateGroup() {
  return (
    <>
      <div className="tab-content">
        <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
          <div className="p-6 pb-0">
            <div className="ltr:float-right rtl:float-left">
              <div className="relative">
                <button
                  type="button"
                  className="px-4 text-lg text-gray-500 group/tag"
                  data-tw-toggle="modal"
                  data-tw-target="#modal-id2"
                >
                  <i className="mr-1 ri-user-add-line ms-0 "></i>
                  <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-4 rtl:-right-8"></span>
                </button>
              </div>
            </div>
            <h4 className="mb-6 ">Search User </h4>

            <div className="py-1 mt-5 mb-5 bg-slate-100  group-data-[theme-color=red]:bg-red-50 rounded   group-data-[theme-color=red]:">
              <span
                className="bg-slate-100  group-data-[theme-color=red]:bg-red-50 pe-1 ps-3   group-data-[theme-color=red]:"
                id="basic-addon"
              >
                <i className="text-lg text-gray-700 ri-search-line search-icon "></i>
              </span>
              <input
                type="text"
                className="border-0 bg-slate-100  group-data-[theme-color=red]:bg-red-50   group-data-[theme-color=red]: placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:"
                placeholder="Search users.."
                aria-describedby="basic-addon"
              />
            </div>
          </div>

          <div className="h-[80vh]" data-simplebar="">
            <div className="p-6">
              <div>
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  A
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Albert Rodarte
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonB"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Allison Etter
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonC"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  C
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Craig Smiley
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonD"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  D
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Daniel Clay
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonEM"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Doris Brown
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonES"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  I
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Iris Wells
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonF"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  J
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Juan Flakes
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonG"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          John Hall
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonH"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Joy Southern
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonI"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  M
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Mary Farmer
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonJ"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Mark Messer
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonK"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Michael Hinton
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonL"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  O
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Ossie Wilson
                        </h5>
                      </div>
                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonM"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  P
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Phillis Griffin
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonN"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Paul Haynes
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonO"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  R
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Rocky Jackson
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonP"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <div className="p-3 font-bold text-violet-500  group-data-[theme-color=red]:text-red-500">
                  S
                </div>

                <ul className="list-unstyled contact-list">
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Sara Muller
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonQ"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Simon Velez
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonR"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="px-5 py-[15px]">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <h5 className="m-0 text-gray-700 text-14 ">
                          Steve Walker
                        </h5>
                      </div>

                      <div className="relative flex-shrink-0 dropdown">
                        <button
                          className="p-0 text-gray-400 border-0 btn dropdown-toggle "
                          type="button"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButtonS"
                        >
                          <i className="text-lg ri-more-2-fill"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateGroup;
