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
import Profilegroup from "./Profilegroup";
import axios from "axios";
import { Baseurl } from "../Confige";

function Home() {
  const [activeTab, setActiveTab] = useState("chatlist");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isProfileViewVisible, setIsProfileViewVisible] = useState(false);
  const [isProfileGroupVisible, setIsProfileGroupVisible] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null); // Store selected group info

  const [selectedChatId, setSelectedChatId] = useState(null);
  const profileViewRef = useRef(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

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
  const handleCloseProfileGroup = () => {
    setIsProfileGroupVisible(false); // Close Profilegroup
  };
  const handleGroupClick = async (groupId) => {
    // Retrieve the accessToken from localStorage (or wherever you store it)
    const accessToken = localStorage.getItem("accessToken");

    try {
      // API call with Authorization header
      const response = await axios.get(
        `${Baseurl}/api/v1/chat/groupinfo?groupId=${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the access token here
          },
        }
      );

      // Set group info with the API response
      setGroupInfo(response.data);

      // Switch to the Profilegroup tab to show group details
      setActiveTab("profilegroup");
      setIsProfileGroupVisible(true); // Open Profilegroup
      setIsProfileViewVisible(false);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
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
        <Asidemenu onMenuClick={handleMenuClick} activeTab={activeTab} />
        {activeTab === "chatlist" && (
          <Chatsection
            onUserClick={handleUserClick}
            isHeaderOpen={isHeaderOpen}
            setIsHeaderOpen={setIsHeaderOpen}
          />
        )}
        {activeTab === "contacts" && <UserList onMenuClick={handleMenuClick} />}
        {activeTab === "groups" && (
          <GruopList onGroupClick={handleGroupClick} />
        )}
        {/* Pass handleGroupClick */}
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
        {isProfileGroupVisible && groupInfo && (
          <Profilegroup
            groupData={groupInfo}
            onClose={handleCloseProfileGroup} // Use new close function for Profilegroup
          />
        )}
      </div>
    </>
  );
}

export default Home;
