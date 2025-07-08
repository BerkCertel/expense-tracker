import React, { useContext } from "react";
import { DEFAULT_PROFILE_IMAGE, SIDE_MENU_DATA } from "../utils/data";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

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
      <div className="flex flex-col items-center  justify-center">
        <img
          src={
            user?.profileImageUrl ? user.profileImageUrl : DEFAULT_PROFILE_IMAGE
          }
          alt="Profile Image"
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />

        <h5 className="">{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <div
          onClick={() => handleClick(item.path)}
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
        >
          {item.icon && <item.icon className="" />}
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
