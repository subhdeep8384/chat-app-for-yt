import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const SideBar = ({ hidden, sethidden }) => {
  const handleClick = () => {
    sethidden(true);
  };

  return (
    <div
      className={`${hidden ? "hidden" : ""} w-full overflow-auto h-full bg-black text-white border-r border-slate-500 p-4 flex flex-col`}
    >
  
      <div className="sticky top-0 z-10 bg-black p-4 flex space-x-4">
        <SearchInput />
        <LogoutButton />
      </div>

      <div onClick={handleClick}>
        <div className="divider my-2"></div>
        <Conversations className="flex-1 overflow-y-auto" />
        <div className="divider my-2"></div>
      </div>
    </div>
  );
};
export default SideBar;
