import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { selectedConversation  ,  setSelectedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Please enter more characters");
    }

    const Conversation = conversation.users.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (Conversation) {
      

      setSelectedConversation(Conversation);
      if(selectedConversation) document.getElementById(selectedConversation).scrollIntoView({ behavior:'smooth' }); 
      toast("Found " + Conversation.fullname);
      setSearch("");
    } else {
      toast.error("No conversation found");
    }
  };

  return (
    <form
      className="flex items-center gap-2 w-full  mx-auto p-2 border border-gray-300 rounded-full bg-white shadow-sm"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search"
        className="flex-1 px-4 py-2 text-sm outline-none rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 hover:bg-sky-600 text-white p-2 flex items-center justify-center"
      >
        <FaSearch className="text-lg" />
      </button>
    </form>
  );
};

export default SearchInput;
