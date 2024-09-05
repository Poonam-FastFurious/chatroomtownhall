function GroupnewList() {
  return (
    <div>
      <div className="tab-content">
        {/* Start chat content */}
        <div className="chat-leftsidr  eba bg-slate-50 overflow-y-hidden h-screen">
          <div className="p-6">
            <div className="ltr:float-right rtl:float-left">
              <div className="relative">{/* Button trigger modal */}</div>
            </div>
            <h4 className="mb-6 dark:text-gray-50">Groups</h4>

            <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
              <span
                className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3"
                id="basic-addon2"
              >
                <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
              </span>
              <input
                type="text"
                className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400"
                placeholder="Search messages or users"
                aria-label="Search messages or users"
                aria-describedby="basic-addon2"
              />
            </div>

            {/* Start chat-group-list */}
            <div
              className="chat-message-list chat-group-list"
              data-simplebar=""
            >
              <ul>
                {[
                  { name: "General", symbol: "G" },
                  { name: "Reporting", symbol: "R", count: "+23" },
                  { name: "Designers", symbol: "D" },
                  { name: "Developers", symbol: "D", status: "New" },
                  { name: "Project-alpha", symbol: "P" },
                  { name: "Snacks", symbol: "B" },
                ].map((group, index) => (
                  <li
                    key={index}
                    className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded"
                  >
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div
                            className={`flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20`}
                          >
                            <span
                              className={`font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500`}
                            >
                              {group.symbol}
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #{group.name}
                            {group.count && (
                              <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                                {group.count}
                              </span>
                            )}
                            {group.status && (
                              <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                                {group.status}
                              </span>
                            )}
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* End chat-group-list */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupnewList;
