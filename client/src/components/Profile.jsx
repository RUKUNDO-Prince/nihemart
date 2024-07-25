import React, { useState, useRef, useEffect } from "react";
import { profile } from "../assets";
import ProfileDropdown from "./ProfileDropdown";

const Profile = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={profile}
        alt="icon"
        className="w-[50px] cursor-pointer"
        onClick={() => setOpenProfile((prev) => !prev)}
      />
      {openProfile && <ProfileDropdown />}
    </div>
  );
};

export default Profile;
