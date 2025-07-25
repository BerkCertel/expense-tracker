import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "../Navbar";
import SideMenu from "../SideMenu";

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="flex-grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
