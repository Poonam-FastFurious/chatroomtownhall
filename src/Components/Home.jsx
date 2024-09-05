import { useState, useEffect, useRef } from "react";
import Asidemenu from "./Asidemenu";
import Chatsection from "./Chatsection";
import Profilesection from "./Profilesection";
import Settings from "./Settings";
import ChatuserHead from "./ChatuserHead";
import UserList from "./UserList";
import GruopList from "./GroupList";
import Profileview from "./Profileview";

function Home() {
  const [activeTab, setActiveTab] = useState("chatlist");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfileViewVisible, setIsProfileViewVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const profileViewRef = useRef(null);

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

  return (
    <>
      <div className="flex h-screen">
        <Asidemenu onMenuClick={handleMenuClick} />
        {activeTab === "chatlist" && (
          <Chatsection onUserClick={handleUserClick} />
        )}
        {activeTab === "contacts" && <UserList onMenuClick={handleMenuClick} />}
        {activeTab === "groups" && <GruopList />}
        {activeTab === "settings" && <Settings />}
        {activeTab === "profile" && <Profilesection />}
        {selectedChat && (
          <ChatuserHead
            chat={selectedChat}
            onProfileClick={handleProfileClick}
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
