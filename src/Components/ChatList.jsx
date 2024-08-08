// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"
// import Cookies from "js-cookie";
// import { Baseurl } from "../Config";

// function ChatList() {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [showChat, setShowChat] = useState(false);
//     const [chatId, setChatId] = useState("");
//     const userId = Cookies.get("userId");
//     const changeChat = (newChatId) => {
//         setChatId(newChatId);
//         setMessages([]); // Reset messages when changing chat
//       };
//     const handleUserClick = (user) => {
//         if (selectedUser && selectedUser._id === user._id) {
//           setShowChat(!showChat); // Toggle chat visibility
//           return;
//         }
//         setSelectedUser(user);
//         setShowChat(true);
//         changeChat(user._id); // Update chat ID
//       };
//       useEffect(() => {
//         const token = Cookies.get("accessToken");

//         fetch(Baseurl + "/api/v1/chat/getallchat", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             setUsers(data);
//           })
//           .catch((error) => {
//             console.error("Error fetching users:", error);
//           });
//       }, []);
//   return (
//     <>
//                 <div className="chat-leftsidebar lg:w-[380px] bg-slate-50 overflow-y-hidden h-screen">
//             <div className="px-6 ">
//               <h4 className="mb-0 text-gray-700 ">Chats</h4>

//               <div className="py-1 mt-5 mb-5 rounded bg-slate-100">
//                 <span className="bg-slate-100 pe-1 ps-3" id="basic-addon1">
//                   <i className="text-lg text-gray-400 ri-search-line search-icon "></i>
//                 </span>
//                 <input
//                   type="text"
//                   className="border-0 bg-slate-100 placeholder:text-[14px] focus:outline-none"
//                   placeholder="Search messages or users"
//                   aria-label="Search messages or users"
//                   aria-describedby="basic-addon1"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="h-[610px] px-2" data-simplebar>
//                 <ul className="chat-user-list">
//                   {users.map((chat, index) => (
//                     <li
//                       key={index}
//                       className={`px-5 py-[15px] hover:bg-slate-400 transition-all ease-in-out border-b border-white/20  ${
//                         chat.unread ? "unread" : ""
//                       } ${chat.typing ? "typing" : ""}`}
//                       onClick={() => handleUserClick(chat)}
//                     >
//                       <Link to="#">
//                         <div className="flex">
//                           <div className="relative self-center ltr:mr-3 rtl:ml-3">
//                             {chat.placeholder ? (
//                               <div className="flex items-center justify-center w-9 h-9 bg-violet-500/20 rounded-full">
//                                 <span className="text-violet-500">G</span>
//                               </div>
//                             ) : (
//                               <img
//                                 src="https://themesbrand.com/chatvia-tailwind/layouts/assets/images/avatar-2.jpg"
//                                 className="w-9 h-9 rounded-full"
//                                 alt=""
//                               />
//                             )}
//                             <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 "></span>
//                           </div>

//                           <div className="flex-grow overflow-hidden ml-4">
//                             <h5 className="mb-1 text-base truncate ">
//                               {chat.isGroupChat
//                                 ? chat.chatName
//                                 : chat.users.find((u) => u._id !== userId)
//                                 ? `${
//                                     chat.users.find((u) => u._id !== userId)
//                                       .firstName
//                                   } ${
//                                     chat.users.find((u) => u._id !== userId)
//                                       .lastName
//                                   }`
//                                 : "Unknown User"}
//                             </h5>
//                             {chat.typing ? (
//                               <div className="flex items-end gap-2 mb-0 text-violet-500 text-14">
//                                 <p className="mb-0">typing</p>
//                                 <div className="animate-typing flex gap-0.5">
//                                   <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot animate-bounce"></p>
//                                   <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot-2"></p>
//                                   <p className="w-1 h-1 mb-1 bg-violet-500 rounded-full dot-3 animate-bounce"></p>
//                                 </div>
//                               </div>
//                             ) : (
//                               <p
//                                 className={`mb-0 truncate  text-14 ${
//                                   chat.unread
//                                     ? "text-gray-800"
//                                     : "text-gray-500"
//                                 }`}
//                               >
//                                 {chat.latestMessage?.content || "No message"}
//                               </p>
//                             )}
//                           </div>
//                           <div className="text-gray-500 text-11 ">
//                             {new Date(chat.updatedAt).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true, // Use `false` for 24-hour format, `true` for 12-hour format with AM/PM
//                             })}
//                           </div>
//                           {chat.unread && (
//                             <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
//                               <span className="px-2 py-1 text-red-500 bg-red-500/20 rounded-full text-11">
//                                 {chat.count}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//     </>
//   )
// }

// export default ChatList
