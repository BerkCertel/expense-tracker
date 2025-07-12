import React, { useContext } from "react";
import { DEFAULT_PROFILE_IMAGE, SIDE_MENU_DATA } from "../utils/data";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "./Cards/CharAvatar";

function SideMenu({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route == "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 ">
      <div className="flex flex-col items-center justify-center">
        {user?.profileImageUrl == "" && user?.profileImageUrl ? (
          <img
            src={
              user?.profileImageUrl === ""
                ? user?.profileImageUrl
                : DEFAULT_PROFILE_IMAGE
            }
            alt="Profile Image"
            className="w-20 h-20  rounded-full mb-2 object-center"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            height="h-20"
            width="w-20"
            style="text-xl"
          />
        )}

        {/* <img
          src={
            user?.profileImageUrl === ""
              ? user?.profileImageUrl
              : DEFAULT_PROFILE_IMAGE
          }
          alt="Profile Image"
          className="w-20 h-20  rounded-full mb-2 object-center"
        /> */}
        <h5 className="text-gray-950 font-medium leading-6 mb-4 mt-2">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <div
          onClick={() => handleClick(item.path)}
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200`}
        >
          {item.icon && <item.icon className="" />}
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
