/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Asidemenu from "./Asidemenu";
import Chatsection from "./Chatsection";
import Profilesection from "./Profilesection";
import Settings from "./Settings";
import ChatuserHead from "./ChatuserHead";
import UserList from "./UserList";
import GruopList from "./GroupList";
import Profileview from "./Profileview";

function NewsletterPopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Dear Member</h2>
        <p>
          You are now here because you care about all matters pertaining to the
          field of Corporate Compliance and are concerned about it. Since this
          is a virtual Town Hall in the digital space, certain minimum
          etiquettes may please be adhered to.
        </p>
        <p className="mt-4">
          All the members in this site are bona fide professionals in various
          fields related to Compliance. Some may feel the need to be anonymous
          or pseudonymous for various reasons, which shall be respected.
        </p>
        <p className="mt-4">
          The postings, exchanges, and sharing of information should only be
          related to the domain. Members shall never share any personal
          information in this platform, especially in the main Town Hall.
        </p>
        <p className="mt-4">
          All exchanges of communication shall be polite, decent, and
          respectful.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
function Home() {
  const [activeTab, setActiveTab] = useState("chatlist");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfileViewVisible, setIsProfileViewVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const profileViewRef = useRef(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setIsProfileViewVisible(false); // Close profile view when switching tabs
  };

  const handleUserClick = (chat) => {
    setSelectedChat(chat);
    setActiveTab("chatlist");
    setIsProfileViewVisible(false); // Close profile view when selecting a chat
  };

  const handleProfileClick = (chatId) => {
    setSelectedChatId(chatId);
    setIsProfileViewVisible(!isProfileViewVisible);
  };

  const handleCloseProfileView = () => {
    setIsProfileViewVisible(false);
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    localStorage.setItem("popupSeen", "true"); // Set flag in local storage
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Profileview if click is outside of it or on any other component
      if (
        profileViewRef.current &&
        !profileViewRef.current.contains(event.target)
      ) {
        setIsProfileViewVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Check if the popup has been seen before
    const popupSeen = localStorage.getItem("popupSeen");
    if (!popupSeen) {
      setShowPopup(true); // Show the popup if not seen before
    }
  }, []);
  return (
    <>
      {showPopup && <NewsletterPopup onClose={handleClosePopup} />}

      <div className="flex h-screen">
        <Asidemenu onMenuClick={handleMenuClick} activeTab={activeTab} />
        {activeTab === "chatlist" && (
          <Chatsection
            onUserClick={handleUserClick}
            isHeaderOpen={isHeaderOpen}
            setIsHeaderOpen={setIsHeaderOpen}
          />
        )}
        {activeTab === "contacts" && <UserList onMenuClick={handleMenuClick} />}
        {activeTab === "groups" && <GruopList />}
        {activeTab === "settings" && <Settings />}
        {activeTab === "profile" && <Profilesection />}
        {selectedChat && (
          <ChatuserHead
            chat={selectedChat}
            onProfileClick={handleProfileClick}
            isHeaderOpen={isHeaderOpen}
          />
        )}

        {isProfileViewVisible && (
          <Profileview
            chatId={selectedChatId}
            onClose={handleCloseProfileView}
            ref={profileViewRef}
          />
        )}
      </div>
    </>
  );
}

export default Home;
