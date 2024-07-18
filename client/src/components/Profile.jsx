import React, { useState } from "react";
import { profile } from "../assets";
import ProfileDropdown from "./ProfileDropdown";

const Profile = () => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onClick={() => setOpenProfile((prev) => !prev)}
    >
      <img src={profile} alt="icon" className="w-[50px]" />
      {openProfile && <ProfileDropdown />}
    </div>
  );
};

export default Profile;
